import { NextRequest } from "next/server";

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, RateLimitRecord>();

// Global server-wide burst limiter across all unauthenticated callers
const globalTimestamps: number[] = [];
const GLOBAL_BURST_LIMIT = 40; // Max 40 requests per minute server-wide

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (record.timestamps.length === 0) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * Extracts verified client IP address prioritizing trusted reverse proxy headers.
 * Defends against client spoofing of arbitrary X-Forwarded-For headers.
 */
function extractClientIp(req: NextRequest): string {
  // Check Cloudflare verified client IP first
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  // Check True-Client-IP header (Akamai / Cloudflare Enterprise)
  const trueClientIp = req.headers.get("true-client-ip")?.trim();
  if (trueClientIp) return trueClientIp;

  // Check X-Real-IP set by trusted reverse proxies (Nginx, Traefik)
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  // For X-Forwarded-For:
  // In reverse proxy environments that append incoming client IPs,
  // the rightmost value is appended by the nearest trusted edge proxy.
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }

  return "127.0.0.1";
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Checks whether the incoming request conforms to both the per-client and global rate limits.
 * @param req NextRequest
 * @param limit Maximum allowed requests within the window per client (default: 6)
 * @param windowMs Time window in milliseconds (default: 60,000ms = 1 minute)
 */
export function checkRateLimit(
  req: NextRequest,
  limit = 6,
  windowMs = 60 * 1000
): RateLimitResult {
  cleanupStaleEntries(windowMs);

  const now = Date.now();

  // 1. Enforce global server-wide burst limit to safeguard external API quotas
  const recentGlobal = globalTimestamps.filter((ts) => now - ts < windowMs);
  if (recentGlobal.length >= GLOBAL_BURST_LIMIT) {
    const oldestGlobal = recentGlobal[0];
    const resetInSeconds = Math.max(1, Math.ceil((oldestGlobal + windowMs - now) / 1000));
    return {
      allowed: false,
      limit: GLOBAL_BURST_LIMIT,
      remaining: 0,
      resetInSeconds,
    };
  }

  // 2. Enforce per-client IP sliding window limit
  const ip = extractClientIp(req);
  let record = rateLimitMap.get(ip);

  if (!record) {
    record = { timestamps: [] };
    rateLimitMap.set(ip, record);
  }

  // Filter timestamps within current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetInSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  // Record allowed request
  record.timestamps.push(now);
  globalTimestamps.push(now);

  // Prune global list if growing large
  if (globalTimestamps.length > GLOBAL_BURST_LIMIT * 2) {
    globalTimestamps.splice(0, globalTimestamps.length - GLOBAL_BURST_LIMIT);
  }

  const remaining = Math.max(0, limit - record.timestamps.length);

  return {
    allowed: true,
    limit,
    remaining,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}

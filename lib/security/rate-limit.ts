import { NextRequest } from "next/server";

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, RateLimitRecord>();

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

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Checks whether the incoming request conforms to the rate limit.
 * @param req NextRequest
 * @param limit Maximum allowed requests within the window
 * @param windowMs Time window in milliseconds (default: 60,000ms = 1 minute)
 */
export function checkRateLimit(
  req: NextRequest,
  limit = 5,
  windowMs = 60 * 1000
): RateLimitResult {
  cleanupStaleEntries(windowMs);

  // Extract client IP address
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

  const now = Date.now();
  let record = rateLimitMap.get(ip);

  if (!record) {
    record = { timestamps: [] };
    rateLimitMap.set(ip, record);
  }

  // Filter timestamps within the current sliding window
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

  record.timestamps.push(now);
  const remaining = Math.max(0, limit - record.timestamps.length);

  return {
    allowed: true,
    limit,
    remaining,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}

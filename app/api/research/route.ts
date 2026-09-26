import { NextRequest, NextResponse } from "next/server";
import { ResearchRequestSchema } from "@/lib/validation/research";
import { ResearchOrchestrator } from "@/lib/research/orchestrator";
import { checkRateLimit } from "@/lib/security/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Enforce rate limiting: max 6 research requests per minute per IP
  const rateLimit = checkRateLimit(req, 6, 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RATE_LIMITED",
          message: `Too many research requests. Please wait ${rateLimit.resetInSeconds} seconds before starting another research session.`,
        },
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetInSeconds),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    const parsed = ResearchRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: parsed.error.issues[0]?.message || "Invalid research request.",
          },
        },
        { status: 400 }
      );
    }

    const { query } = parsed.data;
    const session = await ResearchOrchestrator.executeResearch(query);

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("[API/Research] Unexpected error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to execute research. Please try again with a revised question.";
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Session ID parameter is required.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const session = await ResearchOrchestrator.getResearch(id);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Research session not found.",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("[API/Research] Error fetching session:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unable to retrieve session.",
        },
      },
      { status: 500 }
    );
  }
}

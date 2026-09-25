import { NextRequest, NextResponse } from "next/server";
import { ResearchRequestSchema } from "@/lib/validation/research";
import { ResearchOrchestrator } from "@/lib/research/orchestrator";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
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
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to execute research. Please try again with a revised question.",
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

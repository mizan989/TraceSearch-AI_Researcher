import { NextResponse } from "next/server";
import { listRecentSessionsFromStorage } from "@/lib/supabase/queries";

export async function GET() {
  try {
    const sessions = await listRecentSessionsFromStorage(25);
    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error("[API/History] Error retrieving history:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to load research history.",
        },
      },
      { status: 500 }
    );
  }
}

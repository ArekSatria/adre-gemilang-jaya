import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Belum login." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: session,
  });
}

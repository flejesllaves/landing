import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    "google-site-verification: googlefeddbc3139749c58.html",
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    }
  );
}
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BANNER_PATH = path.join(process.cwd(), "src/data/banner.json");

export async function GET() {
  const data = await fs.readFile(BANNER_PATH, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await fs.writeFile(BANNER_PATH, JSON.stringify({ mensaje: body.mensaje }, null, 2));
  return NextResponse.json({ success: true });
}
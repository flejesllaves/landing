import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { DateTime } from "luxon";

const MESSAGES_PATH = path.join(process.cwd(), "src/data/messages.json");

export async function GET() {
  const data = await fs.readFile(MESSAGES_PATH, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = await fs.readFile(MESSAGES_PATH, "utf-8");
  const messages = JSON.parse(data);
  const newMessage = {
    ...body,
    id: Date.now(),
    createdAt: DateTime.now().setZone("America/Montevideo").toISO(),
  };
  messages.unshift(newMessage);
  await fs.writeFile(MESSAGES_PATH, JSON.stringify(messages, null, 2));
  return NextResponse.json(newMessage, { status: 201 });
}
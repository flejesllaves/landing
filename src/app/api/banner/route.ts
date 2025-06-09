import { NextRequest, NextResponse } from "next/server";

// const API_KEY = process.env.JSONBIN_API_KEY!;
const BIN_ID = "684665f98960c979a5a6dae6";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export async function GET() {
  const res = await fetch(BASE_URL + "/latest", {
    cache: "no-store"
  });
  if (!res.ok) return NextResponse.json({ mensaje: "" }, { status: 200 });
  const data = await res.json();
  return NextResponse.json(data.record?.[0] || { mensaje: "" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const save = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([{ mensaje: body.mensaje }]),
  });
  if (!save.ok) return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  return NextResponse.json({ success: true });
}
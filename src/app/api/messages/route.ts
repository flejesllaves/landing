import { NextRequest, NextResponse } from "next/server";

// const API_KEY = process.env.JSONBIN_API_KEY!;
const BIN_ID = "684666138561e97a50213fbb";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

console.log('JSONBIN_MESSAGES_BIN_ID:', BIN_ID);
console.log('JSONBIN_MESSAGES_BASE_URL:', BASE_URL);

export async function GET() {
  const res = await fetch(BASE_URL + "/latest", {
    cache: "no-store"
  });
  if (!res.ok) return NextResponse.json([], { status: 200 });
  const data = await res.json();
  // El bin es [[]], así que devolvemos el primer elemento si existe
  return NextResponse.json(data.record?.[0]?.mensajes || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Leer mensajes actuales
  const res = await fetch(BASE_URL + "/latest", {
    cache: "no-store"
  });
  let mensajes = [];
  if (res.ok) {
    const data = await res.json();
    mensajes = data.record?.[0]?.mensajes || [];
  }
  const newMessage = {
    ...body,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  mensajes.unshift(newMessage);
  // Guardar mensajes actualizados en el formato [[]]
  const save = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([{ mensajes }]),
  });
  const saveText = await save.text();
  if (!save.ok) return NextResponse.json({ error: "No se pudo guardar", detalle: saveText }, { status: 500 });
  return NextResponse.json(newMessage, { status: 201 });
}
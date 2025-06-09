import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const USERS_PATH = path.join(process.cwd(), "src/data/users.json");

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const data = await fs.readFile(USERS_PATH, "utf-8");
  const users = JSON.parse(data);
  const user = users.find((u: any) => u.username === username && u.password === password);
  if (user) {
    return NextResponse.json({ success: true, username });
  } else {
    return NextResponse.json({ success: false, message: "Credenciales incorrectas" }, { status: 401 });
  }
}
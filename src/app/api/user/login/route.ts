import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "../../../../../backend/app";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as { email: string; name: string };
  const user = await loginUser(data);
  //   const body = request.body as { email: string; name: string };
  return NextResponse.json({ message: "Hello " + JSON.stringify(user) });
}

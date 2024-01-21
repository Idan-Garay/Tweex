import { NextRequest, NextResponse } from "next/server";
import { verifyCode } from "backend/app/email/verify-code";

export async function POST(request: NextRequest) {
  const { email, code } = (await request.json()) as {
    email: string;
    code: string;
  };
  let result: { status: boolean; message: string } = {
    status: false,
    message: "Something went wrong.",
  };
  result = await verifyCode(email, code);

  return NextResponse.json(result);
}

import userExist from "backend/app/authenticate/register/user-exist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as { username: string; email: string };

  const result = {
    success: true,
    data: {},
    message: "",
  };

  const { username, email } = data;
  const user = await userExist(username, email);

  if (user) {
    let message = "email already exists!";
    if (user.username === username) message = "username already exists!";

    result.success = false;
    result.message = message;
  }
  return NextResponse.json(result);
}

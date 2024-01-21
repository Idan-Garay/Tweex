import registerUser from "backend/app/authenticate/register/register-user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json() as {
    username?: string;
    email?: string;
    password?: string;
    birthDate?: Date;
    isEmailVerified?: boolean;
  };

  const result = {
    success: false,
    data: {},
    message:  "User already exists!",
  };
  const user = await registerUser(data);

  if (user) {
    result.success = true;
    result.message= "User successfully created!",
    result.data = user;
  }

  return NextResponse.json(result);
}

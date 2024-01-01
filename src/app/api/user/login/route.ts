import { NextRequest, NextResponse } from "next/server";
import { comparePasswords } from "../../../../../prisma/utilities/hashPassword";
import loginJwtToken from "../../../../../backend/app/authenticate/login/login-user-jwt";

const TEST_USER = (() => {
  return {
    username: "test@test.com",
    password: "$2b$10$IVh1syTMvXSsZDEzilviEOGZ40eKU96n8oFVLyOkM0Zs5gTru93A6",
  };
})();

export async function POST(request: NextRequest) {
  const user = (await request.json()) as {
    username: string;
    password: string;
  };
  const { username, password } = user;

  if (
    username === TEST_USER.username &&
    (await comparePasswords(password, TEST_USER.password))
  ) {
    console.log("here success");
    return NextResponse.json({
      success: true,
      message: "Hello " + JSON.stringify(user.username),
      token: await loginJwtToken({ username }),
    });
  } else {
    console.log("err", username !== TEST_USER.username);
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }
}

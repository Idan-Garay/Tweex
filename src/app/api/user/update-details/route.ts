import { decodeAccessToken } from "backend/app/authenticate/login/login-user-jwt";
import updateDetails from "backend/app/user/update-details";
import {NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json() as { dob: Date };
  const { dob } = data;
  const authHeader = request.headers.get("Authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401, statusText: "Unauthorized" },
    );
  }
  const accessUser =(await decodeAccessToken(accessToken)).payload as {id:number}

  const result = {
    success: false,
    data: {},
    message: "User already exists!",
  };
  // return result
  const user = await updateDetails(accessUser?.id??0, {birthdate: dob});

  if (user) {
    result.success = true;
    (result.message = "User successfully created!"), (result.data = user);
  }

  return NextResponse.json(result);
}

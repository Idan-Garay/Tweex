import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import loginUser from "../../../../../backend/app/authenticate/login/login-user";
import type User from "../../../../../types/user";

export async function POST(request: NextRequest) {
  try {
    const user = (await request.json()) as {
      username?: string;
      credential?: string;
      clientId?: string;
    };
    if (user.credential) {
      const client = new OAuth2Client();
      await client
        .verifyIdToken({
          idToken: user.credential ?? "",
          audience: user.clientId,
        })
        .then((loginTicket) => {
          const payload = loginTicket.getPayload();
          user.username = payload?.email;
        })
        .catch(console.error);
    }
    const username = user.username ?? "";
    const dbUser: User | null = await loginUser({ username });

    if (dbUser) {
      return NextResponse.json(
        {
          success: true,
          data: dbUser,
        },
        { status: 200, statusText: "User exists!" },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "User doesn't exists!",
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(`Error at api/user/username-login`);
    return NextResponse.json(
      {
        success: false,
        message: null,
      },
      { status: 500, statusText: "Cannot connect to backend" },
    );
  }
}

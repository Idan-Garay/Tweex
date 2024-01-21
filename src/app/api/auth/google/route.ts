import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { loginUser } from "backend/app";
import registerUser from "backend/app/authenticate/register/register-user";
import loginJwtToken from "backend/app/authenticate/login/login-user-jwt";

export async function POST(request: NextRequest) {
  try {
    const user = (await request.json()) as {
      username?: string;
      email?: string;
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
          // console.log("payload", payload);
          user.email = payload?.email;
        })
        .catch(console.error);
    }
    const username = user.username ?? "";
    const email = user.email ?? "";
    const dbUser = await loginUser({ username, email });
    console.log('dbUser', dbUser?.email)
    // return accessToken
    if (dbUser) {
      const accessToken = await loginJwtToken({
        email: dbUser?.email,
        id: dbUser?.id,
        username: dbUser?.username,
      });

      return NextResponse.json(
        {
          success: true,
          data: { accessToken },
        },
        { status: 200, statusText: "User exists!" },
      );
    } else {
      const dbUser = await registerUser({ email, isEmailVerified: true });
      const accessToken = await loginJwtToken({
        email: dbUser?.email,
        id: dbUser?.id,
        username: dbUser?.username,
      });
      if (dbUser) {
        return NextResponse.json(
          {
            success: true,
            data: { accessToken },
          },
          { status: 201, statusText: "User created" },
        );
      }
    }
  } catch (error) {
    console.log(`Error at api/auth/google`);
    return NextResponse.json(
      {
        success: false,
        message: null,
      },
      { status: 500, statusText: "Cannot connect to backend" },
    );
  }
}

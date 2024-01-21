import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.APP_SECRET);

export default async function loginJwtToken(data: {
  username?: string;
  id?: number;
  email?: string;
}) {
  const alg = "HS256";
  const jwt = await new jose.SignJWT({
    "urn:example:claim": true,
    data,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("15m")
    .sign(secret);
  return jwt;
}

export async function decodeAccessToken(accessToken: string) {
  const secret = new TextEncoder().encode(process.env.APP_SECRET);
  const data = await jose.jwtVerify(accessToken, secret);
  return data.payload;
}

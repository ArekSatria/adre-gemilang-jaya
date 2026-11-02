import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_STR = process.env.JWT_SECRET || "adre-esports-secret-key-change-this-in-production-2026";
const SECRET_KEY = new TextEncoder().encode(SECRET_STR);

export interface SessionPayload {
  id: string;
  email: string;
  name: string;
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export async function getAuthSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("adre_admin_token")?.value;
  if (!token) return null;
  return await verifyToken(token);
}

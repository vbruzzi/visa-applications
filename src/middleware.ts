import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "@/lib/session";
import { logout } from "./app/actions/auth";

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? decryptSession(cookie) : null;

  // If no valid session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (session.username !== "admin") {
    logout();
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};

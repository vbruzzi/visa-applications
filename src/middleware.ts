import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "@/lib/session";
import { logout } from "./app/actions/auth";
import hasPermission from "./lib/has-permission";

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? decryptSession(cookie) : null;

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!hasPermission(session.username)) {
    logout();
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};

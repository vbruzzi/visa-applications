"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encryptSession } from "@/lib/session";
import verifyCredentials from "@/lib/verify-credentials";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (verifyCredentials(username, password)) {
    const session = { username: username };
    const encryptedSession = encryptSession(session);

    (await cookies()).set("session", encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    redirect("/app");
  } else {
    return { error: "Invalid username or password" };
  }
}

export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}

export interface Session {
  username: string;
}

/**
 * Encrypts session data to base64
 * B64 Here for POC purposes
 */
export function encryptSession(session: Session): string {
  const sessionString = JSON.stringify(session);
  return Buffer.from(sessionString).toString("base64");
}

/**
 * Decrypts session data from base64
 * B64 Here for POC purposes
 */
export function decryptSession(encryptedSession: string): Session | null {
  try {
    const sessionString = Buffer.from(encryptedSession, "base64").toString(
      "utf-8"
    );
    const session = JSON.parse(sessionString);

    // Validate session structure
    if (session && typeof session.username === "string") {
      return session as Session;
    }

    return null;
  } catch {
    return null;
  }
}

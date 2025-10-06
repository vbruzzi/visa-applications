/**
 * Mock credential verification, for testing purposes we only care admin for testing
 * permissions and "other" for testing non-admin access.
 * @param username
 * @param password
 * @returns True if the credentials belong to a valid user.
 */
export default function verifyCredentials(username: string, password: string) {
  return (
    (username === "admin" && password === "pw") ||
    (username === "other" && password === "pw")
  );
}

export default function VerifyCredentials(username: string, password: string) {
  // other user for testing that non-admin users cannot access the app
  return (
    (username === "admin" && password === "pw") ||
    (username === "other" && password === "pw")
  );
}

/**
 * Mock permission check, for testing purposes we only care about giving "admin" access.
 * @param username
 * @returns True if the user has permission for the requested resource.
 */
export default function hasPermission(username: string) {
  return username === "admin";
}

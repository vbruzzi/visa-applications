import { encryptSession, decryptSession } from "./session";

test("encrypts and decrypts", () => {
  const payload = { username: "foo" };

  const encrypted = encryptSession(payload);
  const decrypted = decryptSession(encrypted);

  expect(encrypted).not.toContain("foo");
  expect(decrypted?.username).toBe("foo");
});

test("returns null on invalid b64", () => {
  expect(decryptSession("notvalidb64")).toBeNull();
});

test("returns null on invalid data type", () => {
  const payload = JSON.stringify({ username: 123 });
  const b64 = Buffer.from(payload).toString("base64");
  expect(decryptSession(b64)).toBeNull();
});

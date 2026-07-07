import { randomUUID } from "node:crypto";

// STUB auth store: in-memory, no password hashing, no persistence across restarts.
// This exists only to give the frontend a real integration boundary to build
// against; replace with a real user database + hashed credentials before shipping.

interface User {
  id: string;
  email: string;
}

const usersByEmail = new Map<string, User>();
const tokens = new Map<string, string>(); // token -> userId

export function registerOrLogin(email: string): { user: User; token: string } {
  let user = usersByEmail.get(email);
  if (!user) {
    user = { id: randomUUID(), email };
    usersByEmail.set(email, user);
  }
  const token = randomUUID();
  tokens.set(token, user.id);
  return { user, token };
}

export function getUserByToken(token: string): User | undefined {
  const userId = tokens.get(token);
  if (!userId) return undefined;
  for (const user of usersByEmail.values()) {
    if (user.id === userId) return user;
  }
  return undefined;
}

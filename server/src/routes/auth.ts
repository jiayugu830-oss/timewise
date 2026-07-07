import { Router } from "express";
import { z } from "zod";
import { registerOrLogin, getUserByToken } from "../userStore.js";

const CredsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

// STUB: accepts any password for a given email. No hashing, no real persistence.
// Real auth (password verification, durable storage) is a deliberate follow-up,
// not part of this build.
authRouter.post("/register", (req, res) => {
  const parsed = CredsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { user, token } = registerOrLogin(parsed.data.email);
  res.json({ user, token });
});

authRouter.post("/login", (req, res) => {
  const parsed = CredsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { user, token } = registerOrLogin(parsed.data.email);
  res.json({ user, token });
});

authRouter.get("/me", (req, res) => {
  const auth = req.header("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : undefined;
  const user = token ? getUserByToken(token) : undefined;
  if (!user) return res.status(401).json({ error: "unauthenticated" });
  res.json({ user });
});

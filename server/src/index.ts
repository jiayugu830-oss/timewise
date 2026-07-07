import "dotenv/config";
import express from "express";
import cors from "cors";
import { clarifyRouter } from "./routes/clarify.js";
import { essenceRouter } from "./routes/essence.js";
import { motifRouter } from "./routes/motif.js";
import { echoesRouter } from "./routes/echoes.js";
import { echoDetailRouter } from "./routes/echoDetail.js";
import { authRouter } from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT ?? 8787;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, hasApiKey: Boolean(process.env.ARK_API_KEY) });
});

app.use("/api/clarify", clarifyRouter);
app.use("/api/essence", essenceRouter);
app.use("/api/motif", motifRouter);
app.use("/api/echoes", echoesRouter);
app.use("/api/echo-detail", echoDetailRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`[timewise-server] listening on http://localhost:${PORT}`);
});

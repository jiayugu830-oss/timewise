import type { EchoItem } from "./schemas.js";

interface EchoSession {
  userQuestion: string;
  essentialQuestion: string;
  motifName: string;
  pool: EchoItem[]; // all generated echoes, in delivery order
  nextIndex: number; // index of the next un-served batch start
  refreshCount: number; // how many times "换一批" has been used (max 3)
  reservePending: boolean; // true once the background reserve generation has been kicked off
}

const sessions = new Map<string, EchoSession>();

const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour, generous for a single sitting
const lastTouched = new Map<string, number>();

function touch(id: string) {
  lastTouched.set(id, Date.now());
}

function sweep() {
  const now = Date.now();
  for (const [id, t] of lastTouched) {
    if (now - t > SESSION_TTL_MS) {
      sessions.delete(id);
      lastTouched.delete(id);
    }
  }
}
setInterval(sweep, 10 * 60 * 1000);

export function createEchoSession(
  id: string,
  data: { userQuestion: string; essentialQuestion: string; motifName: string; initialEchoes: EchoItem[] },
) {
  sessions.set(id, {
    userQuestion: data.userQuestion,
    essentialQuestion: data.essentialQuestion,
    motifName: data.motifName,
    pool: data.initialEchoes,
    nextIndex: 0,
    refreshCount: 0,
    reservePending: false,
  });
  touch(id);
}

export function getEchoSession(id: string): EchoSession | undefined {
  touch(id);
  return sessions.get(id);
}

export function appendToPool(id: string, echoes: EchoItem[]) {
  const s = sessions.get(id);
  if (!s) return;
  s.pool.push(...echoes);
}

export function markReservePending(id: string) {
  const s = sessions.get(id);
  if (s) s.reservePending = true;
}

export function takeNextBatch(id: string, batchSize = 3): EchoItem[] {
  const s = sessions.get(id);
  if (!s) return [];
  touch(id);
  const batch = s.pool.slice(s.nextIndex, s.nextIndex + batchSize);
  s.nextIndex += batch.length;
  return batch;
}

export function currentFigures(id: string): string[] {
  const s = sessions.get(id);
  return s ? s.pool.map((e) => e.figure) : [];
}

export function incrementRefresh(id: string): number {
  const s = sessions.get(id);
  if (!s) return 0;
  s.refreshCount += 1;
  return s.refreshCount;
}

import type {
  ClarifyTurn,
  ConversationTurn,
  Essence,
  Motif,
  EchoItem,
  EchoSearchResponse,
  EchoRefreshResponse,
  EchoDetail,
  AuthUser,
} from './types';

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function fetchClarifyTurn(userQuestion: string, history: ConversationTurn[]) {
  return postJSON<ClarifyTurn>('/api/clarify', {
    user_question: userQuestion,
    conversation_history: history,
  });
}

export function fetchEssence(userQuestion: string, history: ConversationTurn[]) {
  return postJSON<Essence>('/api/essence', {
    user_question: userQuestion,
    conversation_history: history,
  });
}

export function fetchMotif(essentialQuestion: string, history: ConversationTurn[]) {
  return postJSON<Motif>('/api/motif', {
    essential_question: essentialQuestion,
    conversation_history: history,
  });
}

export function searchEchoes(userQuestion: string, essentialQuestion: string, motifName: string) {
  return postJSON<EchoSearchResponse>('/api/echoes/search', {
    user_question: userQuestion,
    essential_question: essentialQuestion,
    motif_name: motifName,
  });
}

export function refreshEchoes(sessionId: string) {
  return postJSON<EchoRefreshResponse>('/api/echoes/refresh', { session_id: sessionId });
}

export function fetchEchoDetail(userQuestion: string, essentialQuestion: string, selectedEcho: EchoItem) {
  return postJSON<EchoDetail>('/api/echo-detail', {
    user_question: userQuestion,
    essential_question: essentialQuestion,
    selected_echo: selectedEcho,
  });
}

export function authRegister(email: string, password: string) {
  return postJSON<{ user: AuthUser; token: string }>('/api/auth/register', { email, password });
}

export function authLogin(email: string, password: string) {
  return postJSON<{ user: AuthUser; token: string }>('/api/auth/login', { email, password });
}

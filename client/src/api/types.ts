export type ConversationTurn = { role: 'user' | 'assistant'; content: string };

export interface ClarifyTurn {
  restatement: string;
  question: string;
  options: [string, string, string];
  should_continue: boolean;
}

export interface Essence {
  essential_question: string;
}

export interface Motif {
  motif_name: string;
  motif_explanation: string;
}

export type CitationType = '原文可考' | '译文整理' | '历史背景概述';

export interface EchoItem {
  era: string;
  figure: string;
  one_liner: string;
  quote: string;
  quote_source: string;
  citation_type: CitationType;
}

export interface EchoSearchResponse {
  session_id: string;
  echoes: EchoItem[];
  refresh_left: number;
  can_refresh: boolean;
}

export interface EchoRefreshResponse {
  echoes: EchoItem[];
  refresh_left: number;
  can_refresh: boolean;
}

export interface EchoDetail {
  user_question_restated: string;
  historical_situation: string;
  how_he_faced_it: string;
  original_text: {
    quote: string;
    source: string;
    citation_type: CitationType;
  };
  modern_interpretation: string;
  how_to_understand_now: string;
  one_small_action: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

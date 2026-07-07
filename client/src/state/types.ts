import type { EchoItem, EchoDetail, ConversationTurn } from '../api/types';

export type Screen =
  | 'home'
  | 'input'
  | 'clarify'
  | 'confirm'
  | 'flip'
  | 'motif'
  | 'echoes'
  | 'detail'
  | 'river'
  | 'profile';

export interface ClarifyBubble {
  role: 'ai' | 'user';
  text: string;
}

export interface Lamp {
  id: string;
  echo: EchoItem;
  detail: EchoDetail;
}

export interface Stream {
  motif: string;
  lamps: Lamp[];
}

export interface AppState {
  screen: Screen;
  inputText: string;
  userQuestion: string;
  history: ConversationTurn[];
  messages: ClarifyBubble[];
  typing: boolean;
  awaiting: boolean;
  options: string[];
  freeText: string;
  roundCount: number;
  shouldContinue: boolean;
  essentialQuestion: string;
  motifName: string;
  motifExplanation: string;
  loadingLineIdx: number;
  echoSessionId: string | null;
  echoes: EchoItem[];
  refreshLeft: number;
  canRefresh: boolean;
  activeEcho: EchoItem | null;
  activeDetail: EchoDetail | null;
  fromRiver: boolean;
  collectedKeys: string[];
  streams: Stream[];
  toast: boolean;
  busy: boolean;
  errorMsg: string | null;
  showLoginPrompt: boolean;
}

export const MOTIF_TOTAL = 12;

export const EXAMPLES = [
  '我马上要入职第一份工作，特别怕达不到老板的预期。',
  '我该留在熟悉的城市，还是去一个陌生的地方重新开始？',
  '父母在慢慢变老，而我好像什么都留不住。',
  '我努力了很久，却好像一直没有被看见。',
];

export const LOADING_LINES = [
  '正在从历史长河中，寻找与你相似的人……',
  '正在翻阅那些曾经穿过黑夜的文字……',
  '正在辨认这个困惑背后，更古老的母题……',
];

export const INITIAL_STATE: AppState = {
  screen: 'home',
  inputText: '',
  userQuestion: '',
  history: [],
  messages: [],
  typing: false,
  awaiting: false,
  options: [],
  freeText: '',
  roundCount: 0,
  shouldContinue: true,
  essentialQuestion: '',
  motifName: '',
  motifExplanation: '',
  loadingLineIdx: 0,
  echoSessionId: null,
  echoes: [],
  refreshLeft: 3,
  canRefresh: true,
  activeEcho: null,
  activeDetail: null,
  fromRiver: false,
  collectedKeys: [],
  streams: [],
  toast: false,
  busy: false,
  errorMsg: null,
  showLoginPrompt: false,
};

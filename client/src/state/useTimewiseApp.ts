import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchClarifyTurn,
  fetchEssence,
  fetchMotif,
  searchEchoes,
  refreshEchoes as refreshEchoesApi,
  fetchEchoDetail,
} from '../api/client';
import type { EchoItem } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { INITIAL_STATE, LOADING_LINES, MOTIF_TOTAL, EXAMPLES, type AppState, type Lamp } from './types';

const MAX_ROUNDS = 5;
const GENERIC_ERROR = 'AI 暂时无法回应，请稍后再试。';

export function useTimewiseApp() {
  const { user } = useAuth();
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const patch = useCallback((p: Partial<AppState> | ((s: AppState) => Partial<AppState>)) => {
    setState((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) }));
  }, []);

  const goHome = useCallback(() => patch({ screen: 'home', toast: false }), [patch]);
  const goInput = useCallback(() => patch({ screen: 'input' }), [patch]);
  const goRiver = useCallback(() => patch({ screen: 'river', toast: false }), [patch]);
  const goProfile = useCallback(() => patch({ screen: 'profile', toast: false }), [patch]);
  const goMotif = useCallback(() => patch({ screen: 'motif' }), [patch]);
  const backToChat = useCallback(() => patch({ screen: 'clarify' }), [patch]);

  const onInputChange = useCallback((value: string) => patch({ inputText: value }), [patch]);
  const onFreeChange = useCallback((value: string) => patch({ freeText: value }), [patch]);
  const fillExample = useCallback((text: string) => patch({ inputText: text }), [patch]);

  const runClarifyTurn = useCallback(
    async (question: string, history: AppState['history']) => {
      patch({ typing: true, awaiting: false });
      try {
        const turn = await fetchClarifyTurn(question, history);
        const newRound = stateRef.current.roundCount + 1;
        const forceStop = newRound >= MAX_ROUNDS;
        patch((s) => ({
          messages: [...s.messages, { role: 'ai', text: turn.restatement }, { role: 'ai', text: turn.question }],
          history: [...history, { role: 'assistant', content: `${turn.restatement} ${turn.question}` }],
          typing: false,
          awaiting: true,
          options: turn.options,
          roundCount: newRound,
          shouldContinue: forceStop ? false : turn.should_continue,
        }));
      } catch {
        patch({ typing: false, errorMsg: GENERIC_ERROR });
      }
    },
    [patch],
  );

  const startClarify = useCallback(async () => {
    const q = stateRef.current.inputText.trim() || EXAMPLES[0];
    patch({
      screen: 'clarify',
      userQuestion: q,
      history: [],
      messages: [],
      roundCount: 0,
      options: [],
      freeText: '',
    });
    await runClarifyTurn(q, []);
  }, [patch, runClarifyTurn]);

  const finishClarifyAndGoConfirm = useCallback(
    async (history: AppState['history']) => {
      patch({ typing: true });
      try {
        const essence = await fetchEssence(stateRef.current.userQuestion, history);
        patch({ essentialQuestion: essence.essential_question, screen: 'confirm', typing: false });
      } catch {
        patch({ typing: false, errorMsg: GENERIC_ERROR });
      }
    },
    [patch],
  );

  const submitAnswer = useCallback(
    async (answerText: string) => {
      const newHistory = [...stateRef.current.history, { role: 'user' as const, content: answerText }];
      patch((s) => ({
        messages: [...s.messages, { role: 'user', text: answerText }],
        awaiting: false,
        options: [],
        freeText: '',
        history: newHistory,
      }));
      if (stateRef.current.shouldContinue) {
        await runClarifyTurn(stateRef.current.userQuestion, newHistory);
      } else {
        await finishClarifyAndGoConfirm(newHistory);
      }
    },
    [patch, runClarifyTurn, finishClarifyAndGoConfirm],
  );

  const pickOption = useCallback((label: string) => submitAnswer(label), [submitAnswer]);
  const sendFree = useCallback(() => {
    const t = stateRef.current.freeText.trim();
    if (t) void submitAnswer(t);
  }, [submitAnswer]);

  const reopenClarify = useCallback(async () => {
    patch({ screen: 'clarify' });
    await runClarifyTurn(stateRef.current.userQuestion, stateRef.current.history);
  }, [patch, runClarifyTurn]);

  const confirmAndGoFlip = useCallback(async () => {
    patch({ screen: 'flip', loadingLineIdx: 0 });
    const timer = setInterval(() => {
      patch((s) => ({ loadingLineIdx: (s.loadingLineIdx + 1) % LOADING_LINES.length }));
    }, 1500);
    try {
      const motif = await fetchMotif(stateRef.current.essentialQuestion, stateRef.current.history);
      clearInterval(timer);
      patch({ motifName: motif.motif_name, motifExplanation: motif.motif_explanation, screen: 'motif' });
    } catch {
      clearInterval(timer);
      patch({ screen: 'confirm', errorMsg: GENERIC_ERROR });
    }
  }, [patch]);

  const goEchoes = useCallback(async () => {
    patch({ busy: true });
    try {
      const result = await searchEchoes(
        stateRef.current.userQuestion,
        stateRef.current.essentialQuestion,
        stateRef.current.motifName,
      );
      patch({
        echoSessionId: result.session_id,
        echoes: result.echoes,
        refreshLeft: result.refresh_left,
        canRefresh: result.can_refresh,
        screen: 'echoes',
        busy: false,
      });
    } catch {
      patch({ busy: false, errorMsg: GENERIC_ERROR });
    }
  }, [patch]);

  const doRefreshEchoes = useCallback(async () => {
    const sessionId = stateRef.current.echoSessionId;
    if (!sessionId || !stateRef.current.canRefresh) return;
    patch({ busy: true });
    try {
      const result = await refreshEchoesApi(sessionId);
      patch({
        echoes: result.echoes,
        refreshLeft: result.refresh_left,
        canRefresh: result.can_refresh,
        busy: false,
      });
    } catch {
      patch({ busy: false, errorMsg: GENERIC_ERROR });
    }
  }, [patch]);

  const openEcho = useCallback(
    async (echo: EchoItem) => {
      patch({ activeEcho: echo, activeDetail: null, screen: 'detail', fromRiver: false, busy: true });
      try {
        const detail = await fetchEchoDetail(stateRef.current.userQuestion, stateRef.current.essentialQuestion, echo);
        patch({ activeDetail: detail, busy: false });
      } catch {
        patch({ busy: false, errorMsg: GENERIC_ERROR });
      }
    },
    [patch],
  );

  const openRecord = useCallback(
    (lamp: Lamp) => {
      patch({ activeEcho: lamp.echo, activeDetail: lamp.detail, screen: 'detail', fromRiver: true });
    },
    [patch],
  );

  const backFromDetail = useCallback(() => {
    patch((s) => ({ screen: s.fromRiver ? 'river' : 'echoes' }));
  }, [patch]);

  const dismissLoginPrompt = useCallback(() => patch({ showLoginPrompt: false }), [patch]);
  const openLoginPrompt = useCallback(() => patch({ showLoginPrompt: true }), [patch]);

  const collect = useCallback(() => {
    const { activeEcho, activeDetail, motifName, collectedKeys } = stateRef.current;
    if (!activeEcho || !activeDetail) return;
    if (!user) {
      patch({ showLoginPrompt: true });
      return;
    }
    const key = `${activeEcho.figure}|${activeEcho.era}`;
    if (collectedKeys.includes(key)) return;
    patch((s) => {
      const lamp: Lamp = { id: key, echo: activeEcho, detail: activeDetail };
      const streams = s.streams.map((st) => ({ ...st, lamps: [...st.lamps] }));
      let target = streams.find((st) => st.motif === motifName);
      if (!target) {
        target = { motif: motifName, lamps: [] };
        streams.unshift(target);
      }
      target.lamps = [lamp, ...target.lamps];
      return { streams, collectedKeys: [...s.collectedKeys, key], toast: true };
    });
    setTimeout(() => patch({ toast: false }), 2400);
  }, [patch, user]);

  const dismissError = useCallback(() => patch({ errorMsg: null }), [patch]);

  const lampCount = state.streams.reduce((n, st) => n + st.lamps.length, 0);
  const unlockedCount = state.streams.length;
  const lockedCount = Math.max(0, MOTIF_TOTAL - unlockedCount);
  const collectedActive = !!(
    state.activeEcho && state.collectedKeys.includes(`${state.activeEcho.figure}|${state.activeEcho.era}`)
  );

  return {
    state,
    derived: { lampCount, unlockedCount, lockedCount, collectedActive },
    actions: {
      goHome,
      goInput,
      goRiver,
      goProfile,
      goMotif,
      backToChat,
      onInputChange,
      onFreeChange,
      fillExample,
      startClarify,
      pickOption,
      sendFree,
      reopenClarify,
      confirmAndGoFlip,
      goEchoes,
      doRefreshEchoes,
      openEcho,
      openRecord,
      backFromDetail,
      collect,
      dismissLoginPrompt,
      openLoginPrompt,
      dismissError,
    },
  };
}

export type TimewiseApp = ReturnType<typeof useTimewiseApp>;

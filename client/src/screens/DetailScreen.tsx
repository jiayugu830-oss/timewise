import { useApp } from '../state/AppContext';

export function DetailScreen() {
  const { state, actions, derived } = useApp();
  const echo = state.activeEcho;
  const detail = state.activeDetail;

  if (!echo) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 56, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flexShrink: 0,
          padding: '8px 24px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <button onClick={actions.backFromDetail} style={{ background: 'none', border: 'none', color: 'rgba(214,220,228,0.7)', fontSize: 20, cursor: 'pointer', padding: 4 }}>
          ‹
        </button>
        <div>
          <div style={{ fontSize: 13, letterSpacing: 3, color: '#eef1f5' }}>TA 的 故 事</div>
          <div style={{ fontSize: 11, color: 'rgba(214,220,228,0.5)' }}>
            {echo.figure} · {echo.era}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 28px' }}>
        {!detail ? (
          <div style={{ fontSize: 12.5, color: 'rgba(214,220,228,0.5)', textAlign: 'center', padding: '60px 0' }}>正在打开这段历史……</div>
        ) : (
          <>
            <div style={{ fontSize: 11, color: 'rgba(232,207,160,0.7)', letterSpacing: 1, marginBottom: 8 }}>你的问题</div>
            <div
              style={{
                background: 'rgba(143,166,196,0.08)',
                border: '1px solid rgba(143,166,196,0.18)',
                borderRadius: 12,
                padding: '13px 15px',
                fontSize: 12.5,
                color: 'rgba(222,227,234,0.85)',
                lineHeight: 1.7,
                marginBottom: 22,
              }}
            >
              {detail.user_question_restated}
            </div>

            <div style={{ fontSize: 13.5, fontWeight: 500, color: '#f3eede', marginBottom: 8 }}>他也曾站在那里</div>
            <div style={{ fontSize: 12.5, color: 'rgba(222,227,234,0.78)', lineHeight: 1.8, marginBottom: 20 }}>{detail.historical_situation}</div>

            <div style={{ fontSize: 13.5, fontWeight: 500, color: '#f3eede', marginBottom: 8 }}>他当时如何面对</div>
            <div style={{ fontSize: 12.5, color: 'rgba(222,227,234,0.78)', lineHeight: 1.8, marginBottom: 22 }}>{detail.how_he_faced_it}</div>

            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(165deg,rgba(236,231,218,0.97),rgba(222,216,200,0.94))',
                borderRadius: 14,
                padding: '18px 18px 16px',
                marginBottom: 22,
                boxShadow: '0 16px 40px -14px rgba(0,0,0,0.45)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -9,
                  left: 16,
                  fontSize: 10,
                  letterSpacing: 1,
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: '#2a2620',
                  color: 'rgba(232,207,160,0.85)',
                }}
              >
                {detail.original_text.citation_type}
              </span>
              <div style={{ fontSize: 14.5, color: '#2a2620', lineHeight: 1.8, fontStyle: 'italic', marginTop: 6, marginBottom: 10 }}>
                「{detail.original_text.quote}」
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(40,36,28,0.6)', textAlign: 'right' }}>—— {detail.original_text.source}</div>
            </div>

            <div style={{ marginBottom: 22 }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 10,
                  letterSpacing: 1,
                  padding: '3px 9px',
                  borderRadius: 6,
                  background: 'rgba(143,166,196,0.15)',
                  color: 'rgba(207,222,240,0.85)',
                  marginBottom: 10,
                }}
              >
                Timewise 现代解释
              </span>
              <div style={{ fontSize: 12.5, color: 'rgba(222,227,234,0.78)', lineHeight: 1.8 }}>{detail.modern_interpretation}</div>
            </div>

            <div style={{ fontSize: 13.5, fontWeight: 500, color: '#f3eede', marginBottom: 8 }}>那么今天的你</div>
            <div style={{ fontSize: 12.5, color: 'rgba(222,227,234,0.78)', lineHeight: 1.8, marginBottom: 22 }}>{detail.how_to_understand_now}</div>

            <div
              style={{
                background: 'linear-gradient(160deg,rgba(232,207,160,0.12),rgba(232,207,160,0.04))',
                border: '1px solid rgba(232,207,160,0.25)',
                borderRadius: 14,
                padding: '16px 16px',
              }}
            >
              <div style={{ fontSize: 12, color: 'rgba(232,207,160,0.85)', letterSpacing: 1, marginBottom: 8 }}>✦ 此刻可以做的一件小事</div>
              <div style={{ fontSize: 12.5, color: 'rgba(222,227,234,0.85)', lineHeight: 1.8 }}>{detail.one_small_action}</div>
            </div>
          </>
        )}
      </div>

      {detail && (
        <div style={{ flexShrink: 0, padding: '14px 22px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {derived.collectedActive ? (
            <button
              onClick={actions.goRiver}
              style={{
                width: '100%',
                padding: 15,
                border: '1px solid rgba(232,207,160,0.35)',
                borderRadius: 14,
                background: 'rgba(232,207,160,0.08)',
                color: 'rgba(232,207,160,0.9)',
                fontFamily: "'Noto Serif SC',serif",
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              已点亮 · 去我的回声河看看 ›
            </button>
          ) : (
            <button
              onClick={actions.collect}
              style={{
                width: '100%',
                padding: 15,
                border: 'none',
                borderRadius: 14,
                background: 'linear-gradient(180deg,#e9edf3,#c9d4e2)',
                color: '#13202e',
                fontFamily: "'Noto Serif SC',serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 2,
                cursor: 'pointer',
              }}
            >
              ✦ 收藏这束回声
            </button>
          )}
        </div>
      )}
    </div>
  );
}

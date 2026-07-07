import { useEffect, useRef } from 'react';
import { useApp } from '../state/AppContext';

export function ClarifyScreen() {
  const { state, actions } = useApp();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [state.messages, state.typing, state.awaiting]);

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 56, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flexShrink: 0,
          padding: '8px 24px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 500, color: '#eef1f5' }}>澄清之问</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 12, color: 'rgba(207,222,240,0.5)' }}>
          let the book understand you
        </div>
      </div>

      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {state.messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'ai' ? 'flex-start' : 'flex-end' }}>
            <div
              style={{
                maxWidth: '82%',
                padding: '11px 14px',
                borderRadius: 14,
                fontSize: 13,
                lineHeight: 1.7,
                background: m.role === 'ai' ? 'rgba(255,255,255,0.05)' : 'linear-gradient(180deg,#e9edf3,#c9d4e2)',
                color: m.role === 'ai' ? 'rgba(222,227,234,0.9)' : '#13202e',
                border: m.role === 'ai' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                animation: 'bubblein .3s ease',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {state.typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div
              style={{
                display: 'flex',
                gap: 5,
                padding: '13px 16px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'rgba(214,220,228,0.6)',
                    animation: `dots 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {state.awaiting && (
        <div style={{ flexShrink: 0, padding: '12px 22px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {state.options.map((opt) => (
            <button
              key={opt}
              onClick={() => actions.pickOption(opt)}
              style={{
                textAlign: 'left',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(143,166,196,0.25)',
                borderRadius: 12,
                padding: '11px 14px',
                color: 'rgba(222,227,234,0.88)',
                fontFamily: "'Noto Serif SC',serif",
                fontSize: 12.5,
                lineHeight: 1.6,
                cursor: 'pointer',
              }}
            >
              {opt}
            </button>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <input
              value={state.freeText}
              onChange={(e) => actions.onFreeChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') actions.sendFree();
              }}
              placeholder="或者，自己说说看……"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(143,166,196,0.2)',
                borderRadius: 10,
                padding: '10px 13px',
                color: '#eef1f5',
                fontFamily: "'Noto Serif SC',serif",
                fontSize: 12.5,
                outline: 'none',
              }}
            />
            <button
              onClick={actions.sendFree}
              style={{
                padding: '0 18px',
                border: 'none',
                borderRadius: 10,
                background: 'linear-gradient(180deg,#e9edf3,#c9d4e2)',
                color: '#13202e',
                fontFamily: "'Noto Serif SC',serif",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              送出
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

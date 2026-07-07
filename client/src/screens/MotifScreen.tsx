import type { CSSProperties } from 'react';
import { useApp } from '../state/AppContext';

function CornerBracket({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  const pos: Record<string, CSSProperties> = {
    tl: { left: 14, top: 14, borderRight: 'none', borderBottom: 'none' },
    tr: { right: 14, top: 14, borderLeft: 'none', borderBottom: 'none' },
    bl: { left: 14, bottom: 14, borderRight: 'none', borderTop: 'none' },
    br: { right: 14, bottom: 14, borderLeft: 'none', borderTop: 'none' },
  };
  return (
    <div
      style={{
        position: 'absolute',
        width: 18,
        height: 18,
        border: '1px solid rgba(232,207,160,0.55)',
        ...pos[corner],
      }}
    />
  );
}

export function MotifScreen() {
  const { state, actions } = useApp();

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '64px 30px 40px', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={actions.goHome}
        style={{ background: 'none', border: 'none', color: 'rgba(214,220,228,0.6)', fontSize: 18, cursor: 'pointer', alignSelf: 'flex-end', marginBottom: 14, padding: 4 }}
      >
        ✕
      </button>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 300,
            aspectRatio: '0.62',
            borderRadius: 20,
            background: 'linear-gradient(165deg,#1c2733,#10161e)',
            border: '1px solid rgba(232,207,160,0.3)',
            boxShadow: '0 30px 70px -18px rgba(0,0,0,0.6)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 22px',
            textAlign: 'center',
            animation: 'rise .5s cubic-bezier(.2,.7,.2,1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'repeating-linear-gradient(45deg,rgba(232,207,160,0.04) 0 2px,transparent 2px 14px)',
              pointerEvents: 'none',
            }}
          />
          <CornerBracket corner="tl" />
          <CornerBracket corner="tr" />
          <CornerBracket corner="bl" />
          <CornerBracket corner="br" />

          <div style={{ fontSize: 11, letterSpacing: 3, color: 'rgba(232,207,160,0.7)', marginBottom: 22 }}>LIFE MOTIF</div>
          <div style={{ fontSize: 38, fontWeight: 600, letterSpacing: 7, color: '#f3eede', lineHeight: 1.3, marginBottom: 18 }}>
            {state.motifName}
          </div>
          <div style={{ fontSize: 16, color: 'rgba(232,207,160,0.6)', marginBottom: 18 }}>◆</div>
          <div style={{ fontSize: 12.5, color: 'rgba(222,227,234,0.7)', lineHeight: 1.8 }}>{state.motifExplanation}</div>
        </div>
      </div>

      <button
        onClick={actions.goEchoes}
        disabled={state.busy}
        style={{
          width: '100%',
          padding: 16,
          border: 'none',
          borderRadius: 14,
          background: 'linear-gradient(180deg,#e9edf3,#c9d4e2)',
          color: '#13202e',
          fontFamily: "'Noto Serif SC',serif",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 3,
          cursor: 'pointer',
          marginTop: 24,
        }}
      >
        翻开历史答案
      </button>
    </div>
  );
}

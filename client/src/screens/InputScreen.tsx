import { useApp } from '../state/AppContext';
import { EXAMPLES } from '../state/types';

export function InputScreen() {
  const { state, actions } = useApp();

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '64px 24px 32px', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={actions.goHome}
        style={{ background: 'none', border: 'none', color: 'rgba(214,220,228,0.7)', fontSize: 22, cursor: 'pointer', alignSelf: 'flex-start', marginBottom: 18, padding: 4 }}
      >
        ‹
      </button>

      <div style={{ fontSize: 20, fontWeight: 500, color: '#eef1f5', marginBottom: 6 }}>告诉我你的困惑</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 13, color: 'rgba(207,222,240,0.5)', marginBottom: 22 }}>
        Tell me what troubles you
      </div>

      <div style={{ position: 'relative', marginBottom: 18 }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '120%',
            height: '160%',
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle,rgba(207,222,240,0.12),transparent 70%)',
            animation: 'aura 4.5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <textarea
          value={state.inputText}
          onChange={(e) => actions.onInputChange(e.target.value)}
          placeholder="此刻，你心里盘旋着什么……"
          style={{
            position: 'relative',
            width: '100%',
            height: 228,
            resize: 'none',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(143,166,196,0.25)',
            borderRadius: 16,
            padding: 18,
            color: '#eef1f5',
            fontFamily: "'Noto Serif SC',serif",
            fontSize: 14,
            lineHeight: 1.8,
            outline: 'none',
            caretColor: '#f0d9a0',
            animation: 'inputglow 5s ease-in-out infinite',
          }}
        />
      </div>

      <div style={{ fontSize: 11, color: 'rgba(214,220,228,0.4)', letterSpacing: 1, marginBottom: 10 }}>或者，试试这些</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => actions.fillExample(ex)}
            style={{
              textAlign: 'left',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '10px 14px',
              color: 'rgba(222,227,234,0.75)',
              fontFamily: "'Noto Serif SC',serif",
              fontSize: 12.5,
              lineHeight: 1.6,
              cursor: 'pointer',
            }}
          >
            {ex}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <button
        onClick={actions.startClarify}
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
        }}
      >
        去 历 史 里 找 答 案
      </button>
    </div>
  );
}

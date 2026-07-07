import { useApp } from '../state/AppContext';

export function ConfirmScreen() {
  const { state, actions } = useApp();

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '64px 24px 40px', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={actions.backToChat}
        style={{ background: 'none', border: 'none', color: 'rgba(214,220,228,0.7)', fontSize: 22, cursor: 'pointer', alignSelf: 'flex-start', marginBottom: 24, padding: 4 }}
      >
        ‹
      </button>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            background: 'linear-gradient(165deg,rgba(236,231,218,0.97),rgba(222,216,200,0.94))',
            borderRadius: 18,
            padding: '30px 24px',
            boxShadow: '0 24px 60px -16px rgba(0,0,0,0.5)',
            animation: 'rise .4s cubic-bezier(.2,.7,.2,1)',
          }}
        >
          <div style={{ fontSize: 12, color: 'rgba(40,36,28,0.5)', letterSpacing: 1, marginBottom: 8 }}>你最初问的是</div>
          <div style={{ fontSize: 15, color: '#2a2620', lineHeight: 1.7, marginBottom: 26 }}>「{state.userQuestion}」</div>
          <div style={{ fontSize: 12, color: 'rgba(40,36,28,0.5)', letterSpacing: 1, marginBottom: 8 }}>而你真正担心的，也许是</div>
          <div style={{ fontSize: 17, fontWeight: 500, color: '#2a2620', lineHeight: 1.8 }}>{state.essentialQuestion}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={actions.confirmAndGoFlip}
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
            letterSpacing: 2,
            cursor: 'pointer',
          }}
        >
          确认，去历史里找答案
        </button>
        <button
          onClick={actions.reopenClarify}
          style={{
            width: '100%',
            padding: 13,
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.03)',
            color: 'rgba(222,227,234,0.8)',
            fontFamily: "'Noto Serif SC',serif",
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          还不太准，我想改一下
        </button>
      </div>
    </div>
  );
}

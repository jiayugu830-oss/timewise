import { useApp } from '../state/AppContext';

export function EchoesScreen() {
  const { state, actions } = useApp();

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 56, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, padding: '8px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize: 12, color: 'rgba(232,207,160,0.7)', letterSpacing: 1, marginBottom: 4 }}>母题 · {state.motifName}</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: '#eef1f5' }}>历史回声</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {state.echoes.map((echo, i) => (
          <button
            key={`${echo.figure}-${i}`}
            onClick={() => actions.openEcho(echo)}
            style={{
              position: 'relative',
              textAlign: 'left',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '16px 16px 16px 20px',
              cursor: 'pointer',
              animation: 'rise .35s cubic-bezier(.2,.7,.2,1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 10,
                bottom: 10,
                width: 3,
                borderRadius: 2,
                background: 'linear-gradient(180deg,#e0b876,#8fa6c4)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#f3eede' }}>{echo.figure}</span>
              <span style={{ fontSize: 11, color: 'rgba(214,220,228,0.5)' }}>{echo.era}</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(222,227,234,0.75)', lineHeight: 1.7, marginBottom: 10 }}>{echo.one_liner}</div>
            <div
              style={{
                borderLeft: '2px solid rgba(232,207,160,0.4)',
                paddingLeft: 10,
                fontSize: 12,
                color: 'rgba(232,207,160,0.75)',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              「{echo.quote}」
            </div>
          </button>
        ))}
      </div>

      <div style={{ flexShrink: 0, padding: '14px 22px 24px', textAlign: 'center' }}>
        {state.canRefresh ? (
          <button
            onClick={actions.doRefreshEchoes}
            disabled={state.busy}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 12,
              padding: '11px 20px',
              color: 'rgba(222,227,234,0.8)',
              fontFamily: "'Noto Serif SC',serif",
              fontSize: 12.5,
              cursor: 'pointer',
            }}
          >
            ↻ 换一批回声 · 还剩 {state.refreshLeft} 次
          </button>
        ) : (
          <div style={{ fontSize: 12, color: 'rgba(214,220,228,0.4)', fontStyle: 'italic' }}>有些相遇，只此一回……</div>
        )}
      </div>
    </div>
  );
}

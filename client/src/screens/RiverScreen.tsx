import { useApp } from '../state/AppContext';

export function RiverScreen() {
  const { state, actions, derived } = useApp();

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 56, paddingBottom: 64, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, padding: '8px 24px 16px' }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: '#eef1f5', marginBottom: 4 }}>我的回声河</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 12.5, color: 'rgba(207,222,240,0.5)' }}>
          My River of Echoes
        </div>
      </div>

      {state.streams.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '0 30px' }}>
          <div style={{ fontSize: 13, color: 'rgba(214,220,228,0.5)', textAlign: 'center', lineHeight: 1.8 }}>
            这里还很安静，去提一个问题，点亮第一盏灯。
          </div>
          <button
            onClick={actions.goInput}
            style={{
              padding: '13px 26px',
              border: 'none',
              borderRadius: 14,
              background: 'linear-gradient(180deg,#e9edf3,#c9d4e2)',
              color: '#13202e',
              fontFamily: "'Noto Serif SC',serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2,
              cursor: 'pointer',
            }}
          >
            去提一个问题
          </button>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 22px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {state.streams.map((stream) => (
            <div key={stream.motif}>
              <div style={{ fontSize: 12.5, color: 'rgba(232,207,160,0.75)', letterSpacing: 1, marginBottom: 10 }}>支流 · {stream.motif}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stream.lamps.map((lamp) => (
                  <button
                    key={lamp.id}
                    onClick={() => actions.openRecord(lamp)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      textAlign: 'left',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      padding: '11px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle,#fff0cf,#e0b876)',
                        boxShadow: '0 0 12px 3px rgba(232,207,160,0.5)',
                        animation: 'lampglow 4s ease-in-out infinite',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 13, color: '#f3eede' }}>{lamp.echo.figure}</div>
                      <div style={{ fontSize: 11, color: 'rgba(214,220,228,0.5)' }}>{lamp.echo.era}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {derived.lockedCount > 0 && (
            <div style={{ fontSize: 11.5, color: 'rgba(214,220,228,0.4)', textAlign: 'center', marginTop: 4 }}>
              还有 {derived.lockedCount} 个支流未解锁
            </div>
          )}
        </div>
      )}
    </div>
  );
}

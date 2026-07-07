import type { CSSProperties } from 'react';
import { useApp } from '../state/AppContext';

function navBtnStyle(active: boolean): CSSProperties {
  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Noto Serif SC',serif",
    fontSize: 11,
    letterSpacing: 2,
    color: active ? '#f0e6cf' : 'rgba(214,220,228,0.45)',
  };
}

export function BottomNav() {
  const { state, actions } = useApp();
  if (!(state.screen === 'home' || state.screen === 'river' || state.screen === 'profile')) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        display: 'flex',
        background: 'rgba(9,13,19,0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        zIndex: 55,
      }}
    >
      <button onClick={actions.goHome} style={navBtnStyle(state.screen === 'home')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9.5" r="6" />
          <path d="M9.6 7.3 a3.2 3.2 0 0 1 2.7 -1.6" />
          <path d="M8.4 18 h7.2 l1.1 2.5 h-9.4 z" />
        </svg>
        提问
      </button>
      <button onClick={actions.goRiver} style={navBtnStyle(state.screen === 'river')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8.5 C 7 5.5, 8 12, 12 9 C 16 6, 17 14, 21 11" />
          <path d="M3 14.5 C 7 11.5, 8 18, 12 15 C 16 12, 17 20, 21 17" opacity="0.5" />
        </svg>
        回声河
      </button>
      <button onClick={actions.goProfile} style={navBtnStyle(state.screen === 'profile')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5.5 19 C 5.5 14.5, 18.5 14.5, 18.5 19" />
        </svg>
        我的
      </button>
    </div>
  );
}

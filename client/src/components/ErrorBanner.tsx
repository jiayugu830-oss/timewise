import { useApp } from '../state/AppContext';

export function ErrorBanner() {
  const { state, actions } = useApp();
  if (!state.errorMsg) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 78,
        zIndex: 99,
        background: 'rgba(60,24,24,0.92)',
        border: '1px solid rgba(232,168,168,0.35)',
        borderRadius: 12,
        padding: '12px 16px',
        color: '#f3dede',
        fontSize: 12.5,
        lineHeight: 1.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        animation: 'fadein .25s ease',
      }}
    >
      <span>{state.errorMsg}</span>
      <button
        onClick={actions.dismissError}
        style={{ background: 'none', border: 'none', color: 'rgba(243,222,222,0.8)', fontSize: 14, cursor: 'pointer', flexShrink: 0 }}
      >
        ✕
      </button>
    </div>
  );
}

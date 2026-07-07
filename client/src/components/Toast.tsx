import { useApp } from '../state/AppContext';

export function Toast() {
  const { state } = useApp();
  if (!state.toast) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(8,11,16,0.55)',
        animation: 'fadein .3s ease',
        pointerEvents: 'none',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'rise .6s cubic-bezier(.2,.7,.2,1)' }}>
        <div style={{ position: 'absolute', width: 160, height: 160, border: '1px solid rgba(232,207,160,0.4)', borderRadius: '50%', animation: 'ripple 2.2s ease-out infinite' }} />
        <div style={{ position: 'absolute', width: 160, height: 160, border: '1px solid rgba(232,207,160,0.4)', borderRadius: '50%', animation: 'ripple 2.2s ease-out infinite .7s' }} />
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'radial-gradient(circle,#fff0cf,#e0b876)',
            boxShadow: '0 0 28px 10px rgba(232,207,160,0.6)',
            marginBottom: 24,
          }}
        />
        <div style={{ fontSize: 18, fontWeight: 500, color: '#f3eede', letterSpacing: 3 }}>已为你点亮一盏灯。</div>
      </div>
    </div>
  );
}

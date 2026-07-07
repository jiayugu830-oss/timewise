import type { CSSProperties, ReactNode } from 'react';

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'radial-gradient(120% 90% at 30% 12%, #1a232e 0%, #121821 42%, #0c1016 100%)',
  fontFamily: "'Noto Serif SC',serif",
  padding: '28px 0',
  position: 'relative',
  overflow: 'hidden',
};

const frameStyle: CSSProperties = {
  position: 'relative',
  width: 390,
  height: 844,
  borderRadius: 46,
  overflow: 'hidden',
  background: 'linear-gradient(180deg,#0d121a 0%,#0b0f15 100%)',
  boxShadow: '0 40px 90px -20px rgba(0,0,0,0.75),0 0 0 1px rgba(255,255,255,0.05),inset 0 0 0 1px rgba(255,255,255,0.02)',
};

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div style={pageStyle}>
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          left: '8%',
          top: '6%',
          background: 'radial-gradient(circle,rgba(143,166,196,0.16),transparent 70%)',
          filter: 'blur(20px)',
          animation: 'amb 18s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          right: '6%',
          bottom: '8%',
          background: 'radial-gradient(circle,rgba(232,207,160,0.07),transparent 70%)',
          filter: 'blur(18px)',
          animation: 'amb 22s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
      />
      <div style={frameStyle}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 46,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            zIndex: 60,
            color: 'rgba(230,233,238,0.82)',
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 600,
            fontSize: 15,
            pointerEvents: 'none',
          }}
        >
          <span style={{ letterSpacing: '.5px' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 11, letterSpacing: 1 }}>▪▪▪ ◗ ▭</div>
        </div>
        {children}
      </div>
    </div>
  );
}

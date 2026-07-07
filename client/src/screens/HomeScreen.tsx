import { useApp } from '../state/AppContext';

const ERA_NODES = [
  { label: '公元前500年', left: '31%', top: '4.5%' },
  { label: '公元元年', left: '51%', top: '21%' },
  { label: '公元1500年', left: '38%', top: '37%' },
  { label: '今天 · 你', left: '55%', top: '49%' },
];

export function HomeScreen() {
  const { actions } = useApp();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: -40,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px)',
          backgroundSize: '34px 34px',
          animation: 'grain 17s linear infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: 128,
          color: 'rgba(207,222,240,0.055)',
          whiteSpace: 'nowrap',
          animation: 'wmdrift 20s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        Timewise
      </div>
      <div
        style={{
          position: 'absolute',
          left: -40,
          top: '18%',
          width: '160%',
          height: 220,
          background: 'linear-gradient(100deg,transparent,rgba(143,166,196,0.08),transparent)',
          animation: 'flowband 13s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -40,
          top: '52%',
          width: '160%',
          height: 180,
          background: 'linear-gradient(100deg,transparent,rgba(232,207,160,0.06),transparent)',
          animation: 'flowband 17s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
      />

      <svg
        viewBox="0 0 390 500"
        style={{ position: 'absolute', left: 0, top: 64, width: '100%', height: 380, pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="river-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fa6c4" />
            <stop offset="55%" stopColor="#cfdef0" />
            <stop offset="100%" stopColor="#ecf0f7" />
          </linearGradient>
        </defs>
        <path
          id="river-path"
          d="M150 40 C 250 110, 110 180, 195 250 C 265 305, 150 345, 205 430"
          fill="none"
          stroke="url(#river-grad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle r="3.2" fill="#f3eede">
          <animateMotion dur="8s" repeatCount="indefinite" path="M150 40 C 250 110, 110 180, 195 250 C 265 305, 150 345, 205 430" />
        </circle>
        <circle r="2.4" fill="#e0b876" opacity="0.85">
          <animateMotion dur="8s" begin="3s" repeatCount="indefinite" path="M150 40 C 250 110, 110 180, 195 250 C 265 305, 150 345, 205 430" />
        </circle>
      </svg>

      {ERA_NODES.map((n) => (
        <div key={n.label} style={{ position: 'absolute', left: n.left, top: n.top, display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#cfdef0',
              animation: 'nodepulse 3.4s ease-in-out infinite',
            }}
          />
          <span style={{ fontSize: 11, letterSpacing: 1, color: 'rgba(214,220,228,0.55)' }}>{n.label}</span>
        </div>
      ))}

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 296,
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', width: 96, height: 70, perspective: 600 }}>
          <div
            style={{
              position: 'absolute',
              left: 'calc(50% - 48px)',
              top: 0,
              width: 48,
              height: 70,
              transformOrigin: 'right center',
              transform: 'rotateY(-26deg)',
              background: 'linear-gradient(135deg,#e9edf3,#cfd9e6)',
              borderRadius: '3px 0 0 3px',
              boxShadow: '0 10px 26px -8px rgba(0,0,0,0.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: 48,
              height: 70,
              transformOrigin: 'left center',
              transform: 'rotateY(26deg)',
              background: 'linear-gradient(225deg,#e9edf3,#cfd9e6)',
              borderRadius: '0 3px 3px 0',
              boxShadow: '0 10px 26px -8px rgba(0,0,0,0.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: -6,
              width: 2,
              height: 82,
              transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,0.6)',
              filter: 'blur(1px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: -30,
              width: 70,
              height: 70,
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle,rgba(255,247,224,0.55),transparent 70%)',
              animation: 'beam 3.6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '0 30px 96px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 62, fontWeight: 600, letterSpacing: 10, color: '#f1f3f7', marginBottom: 10 }}>历量</div>
        <div style={{ fontSize: 13, fontWeight: 300, color: 'rgba(214,220,228,0.65)', letterSpacing: 2, marginBottom: 4 }}>
          以历史为尺，量度今天的困惑
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: 'italic',
            fontSize: 14,
            color: 'rgba(207,222,240,0.5)',
            marginBottom: 30,
          }}
        >
          Ask the present. Answer with time.
        </div>
        <button
          onClick={actions.goInput}
          style={{
            width: '100%',
            maxWidth: 280,
            padding: 16,
            border: 'none',
            borderRadius: 14,
            background: 'linear-gradient(180deg,#e9edf3,#c9d4e2)',
            color: '#13202e',
            fontFamily: "'Noto Serif SC',serif",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 4,
            cursor: 'pointer',
            boxShadow: '0 14px 30px -10px rgba(0,0,0,0.5)',
          }}
        >
          开 始 提 问
        </button>
      </div>
    </div>
  );
}

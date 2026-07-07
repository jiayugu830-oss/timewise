import { useApp } from '../state/AppContext';
import { LOADING_LINES } from '../state/types';

const KEYWORDS = [
  { word: '去留', left: '12%', top: '18%', delay: '0s' },
  { word: '亲情', left: '70%', top: '12%', delay: '.6s' },
  { word: '远行', left: '20%', top: '62%', delay: '1.2s' },
  { word: '功名', left: '78%', top: '54%', delay: '1.8s' },
  { word: '孤独', left: '48%', top: '8%', delay: '2.4s' },
  { word: '时间', left: '8%', top: '40%', delay: '.3s' },
  { word: '无常', left: '85%', top: '32%', delay: '1.5s' },
  { word: '失败', left: '32%', top: '78%', delay: '2.1s' },
  { word: '尊严', left: '60%', top: '74%', delay: '.9s' },
];

export function FlipScreen() {
  const { state } = useApp();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {KEYWORDS.map((k) => (
        <span
          key={k.word}
          style={{
            position: 'absolute',
            left: k.left,
            top: k.top,
            fontSize: 13,
            letterSpacing: 2,
            color: 'rgba(207,222,240,0.5)',
            animation: `floatup 5.5s ease-in-out ${k.delay} infinite`,
            pointerEvents: 'none',
          }}
        >
          {k.word}
        </span>
      ))}

      <div style={{ position: 'relative', width: 110, height: 80, perspective: 700, marginBottom: 36 }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 55,
            height: 80,
            background: 'linear-gradient(135deg,#e9edf3,#cfd9e6)',
            borderRadius: '3px 0 0 3px',
            boxShadow: '0 14px 32px -10px rgba(0,0,0,0.55)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 55,
            height: 80,
            transformOrigin: 'left center',
            background: 'linear-gradient(225deg,#f3f0e8,#dcd5c4)',
            borderRadius: '0 3px 3px 0',
            boxShadow: '0 14px 32px -10px rgba(0,0,0,0.55)',
            animation: 'pageturn 2.6s ease-in-out infinite',
          }}
        />
      </div>

      <div style={{ fontSize: 13, color: 'rgba(214,220,228,0.65)', letterSpacing: 1, textAlign: 'center', padding: '0 40px', minHeight: 40 }}>
        {LOADING_LINES[state.loadingLineIdx]}
      </div>
    </div>
  );
}

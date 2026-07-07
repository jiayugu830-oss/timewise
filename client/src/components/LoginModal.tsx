import { useState } from 'react';
import { useApp } from '../state/AppContext';
import { useAuth } from '../auth/AuthContext';

export function LoginModal() {
  const { state, actions } = useApp();
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!state.showLoginPrompt) return null;

  async function handle(fn: (email: string, password: string) => Promise<void>) {
    if (!email || !password) {
      setError('请填写邮箱和密码');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await fn(email, password);
      actions.dismissLoginPrompt();
    } catch {
      setError('登录失败，请重试');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 95,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(8,11,16,0.72)',
        animation: 'fadein .25s ease',
        padding: 28,
      }}
    >
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(165deg,#1b242f,#11161e)',
          border: '1px solid rgba(207,222,240,0.18)',
          borderRadius: 18,
          padding: '26px 22px',
          animation: 'rise .4s cubic-bezier(.2,.7,.2,1)',
        }}
      >
        <div style={{ fontSize: 17, color: '#eef1f5', letterSpacing: 1, marginBottom: 6 }}>登录 / 注册</div>
        <div style={{ fontSize: 12, fontWeight: 300, color: 'rgba(214,220,228,0.6)', lineHeight: 1.6, marginBottom: 18 }}>
          登录后，你的灯火与回声河将被长久地保存下来。
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(143,166,196,0.25)',
            borderRadius: 10,
            padding: '11px 14px',
            color: '#eef1f5',
            fontFamily: "'Noto Serif SC',serif",
            fontSize: 13,
            outline: 'none',
            marginBottom: 10,
          }}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
          type="password"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(143,166,196,0.25)',
            borderRadius: 10,
            padding: '11px 14px',
            color: '#eef1f5',
            fontFamily: "'Noto Serif SC',serif",
            fontSize: 13,
            outline: 'none',
            marginBottom: 14,
          }}
        />
        {error && <div style={{ fontSize: 12, color: '#e8a8a8', marginBottom: 10 }}>{error}</div>}
        <button
          disabled={busy}
          onClick={() => handle(login)}
          style={{
            width: '100%',
            padding: 14,
            border: 'none',
            borderRadius: 13,
            background: 'linear-gradient(180deg,#e9edf3,#c9d4e2)',
            color: '#13202e',
            fontFamily: "'Noto Serif SC',serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 2,
            cursor: 'pointer',
            marginBottom: 10,
          }}
        >
          登录
        </button>
        <button
          disabled={busy}
          onClick={() => handle(register)}
          style={{
            width: '100%',
            padding: 13,
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 13,
            background: 'rgba(255,255,255,0.03)',
            color: 'rgba(222,227,234,0.85)',
            fontFamily: "'Noto Serif SC',serif",
            fontSize: 13,
            cursor: 'pointer',
            marginBottom: 10,
          }}
        >
          注册新账号
        </button>
        <button
          disabled={busy}
          onClick={actions.dismissLoginPrompt}
          style={{ width: '100%', padding: 10, border: 'none', background: 'none', color: 'rgba(214,220,228,0.5)', fontSize: 12, cursor: 'pointer' }}
        >
          暂不登录
        </button>
      </div>
    </div>
  );
}

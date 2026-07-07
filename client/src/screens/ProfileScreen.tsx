import { useApp } from '../state/AppContext';
import { useAuth } from '../auth/AuthContext';

export function ProfileScreen() {
  const { actions, derived } = useApp();
  const { user, logout } = useAuth();

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 56, paddingBottom: 64, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: -40,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px)',
          backgroundSize: '34px 34px',
          animation: 'grain 17s linear infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -40,
          top: '30%',
          width: '160%',
          height: 200,
          background: 'linear-gradient(100deg,transparent,rgba(143,166,196,0.06),transparent)',
          animation: 'flowband 15s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '62%',
          transform: 'translate(-50%,-50%)',
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: 110,
          color: 'rgba(207,222,240,0.045)',
          whiteSpace: 'nowrap',
          animation: 'wmdrift 20s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        Timewise
      </div>

      <div style={{ position: 'relative', height: '100%', overflowY: 'auto', padding: '8px 24px 24px' }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: '#eef1f5', marginBottom: 22 }}>我的</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26 }}>
          <div
            style={{
              position: 'relative',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(165deg,#2a3644,#161e28)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: 'radial-gradient(circle,#fff0cf,#e0b876)',
                boxShadow: '0 0 16px 5px rgba(232,207,160,0.5)',
              }}
            />
          </div>
          <div>
            {user ? (
              <>
                <div style={{ fontSize: 14, color: '#f3eede', marginBottom: 6 }}>{user.email}</div>
                <button
                  onClick={logout}
                  style={{ background: 'none', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, padding: '5px 12px', color: 'rgba(214,220,228,0.7)', fontSize: 11.5, cursor: 'pointer' }}
                >
                  退出登录
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13.5, color: 'rgba(214,220,228,0.6)', marginBottom: 8 }}>未登录的旅人</div>
                <button
                  onClick={actions.openLoginPrompt}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(232,207,160,0.4)',
                    borderRadius: 8,
                    padding: '6px 14px',
                    color: 'rgba(232,207,160,0.85)',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  登录 / 注册
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 26 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#f3eede', marginBottom: 4 }}>{derived.lampCount}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(214,220,228,0.55)' }}>点亮灯火</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#f3eede', marginBottom: 4 }}>{derived.unlockedCount}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(214,220,228,0.55)' }}>解锁母题</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={actions.goRiver}
            style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '15px 16px', color: 'rgba(222,227,234,0.85)', fontFamily: "'Noto Serif SC',serif", fontSize: 13, cursor: 'pointer' }}
          >
            我的回声河
          </button>
          <button
            onClick={actions.goInput}
            style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '15px 16px', color: 'rgba(222,227,234,0.85)', fontFamily: "'Noto Serif SC',serif", fontSize: 13, cursor: 'pointer' }}
          >
            我的提问记录
          </button>
          <button
            style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', border: 'none', padding: '15px 16px', color: 'rgba(222,227,234,0.85)', fontFamily: "'Noto Serif SC',serif", fontSize: 13, cursor: 'pointer' }}
          >
            关于历量
          </button>
        </div>
      </div>
    </div>
  );
}

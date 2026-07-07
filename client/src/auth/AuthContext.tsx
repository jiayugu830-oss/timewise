import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { authLogin, authRegister } from '../api/client';
import type { AuthUser } from '../api/types';

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'timewise_auth';

function loadStored(): { user: AuthUser; token: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadStored()?.user ?? null);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authLogin(email, password);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    setUser(result.user);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const result = await authRegister(email, password);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    setUser(result.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

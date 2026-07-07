import { createContext, useContext, type ReactNode } from 'react';
import { useTimewiseApp, type TimewiseApp } from './useTimewiseApp';

const AppContext = createContext<TimewiseApp | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const app = useTimewiseApp();
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

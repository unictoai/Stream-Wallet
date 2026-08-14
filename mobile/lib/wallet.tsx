import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'stream-wallet.saved-titles';

type WalletContextValue = {
  savedIds: string[];
  ready: boolean;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value) setSavedIds(JSON.parse(value));
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds(current => {
      const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const value = useMemo(() => ({ savedIds, ready, isSaved, toggleSaved }), [isSaved, ready, savedIds, toggleSaved]);
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const value = useContext(WalletContext);
  if (!value) throw new Error('useWallet must be used within WalletProvider');
  return value;
}

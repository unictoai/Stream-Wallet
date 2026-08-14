import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

import {
  calculateLedger,
  type TaskKind,
  type TaskRecord,
  type SponsorStatus,
} from "@/lib/waitback-ledger";

const STORAGE_KEY = "waitback-mobile-state-v1";

type WaitBackState = {
  records: TaskRecord[];
  sponsoredCardsEnabled: boolean;
  privacyModeEnabled: boolean;
};

type NewTaskRecord = Omit<TaskRecord, "id" | "createdAt">;

type WaitBackContextValue = WaitBackState & {
  hydrated: boolean;
  addRecord: (record: NewTaskRecord) => void;
  setSponsoredCardsEnabled: (enabled: boolean) => void;
  setPrivacyModeEnabled: (enabled: boolean) => void;
  summary: ReturnType<typeof calculateLedger>;
};

const initialState: WaitBackState = {
  records: [],
  sponsoredCardsEnabled: true,
  privacyModeEnabled: true,
};

const WaitBackContext = createContext<WaitBackContextValue | null>(null);

export function WaitBackProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WaitBackState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function restoreState() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && isMounted) {
          setState({ ...initialState, ...JSON.parse(stored) });
        }
      } finally {
        if (isMounted) setHydrated(true);
      }
    }

    void restoreState();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const value = useMemo<WaitBackContextValue>(() => {
    const addRecord = (record: NewTaskRecord) => {
      setState((current) => ({
        ...current,
        records: [
          {
            ...record,
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            createdAt: new Date().toISOString(),
          },
          ...current.records,
        ],
      }));
    };

    const update = (changes: Partial<WaitBackState>) => {
      setState((current) => ({ ...current, ...changes }));
    };

    return {
      ...state,
      hydrated,
      addRecord,
      setSponsoredCardsEnabled: (enabled) => update({ sponsoredCardsEnabled: enabled }),
      setPrivacyModeEnabled: (enabled) => update({ privacyModeEnabled: enabled }),
      summary: calculateLedger(state.records),
    };
  }, [hydrated, state]);

  return <WaitBackContext.Provider value={value}>{children}</WaitBackContext.Provider>;
}

export function useWaitBack() {
  const context = useContext(WaitBackContext);
  if (!context) {
    throw new Error("useWaitBack must be used inside WaitBackProvider");
  }
  return context;
}

export type { NewTaskRecord, TaskKind, SponsorStatus };

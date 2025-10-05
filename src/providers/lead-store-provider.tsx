"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type LeadStore, createLeadStore } from "@/stores/lead-store";

export type LeadStoreApi = ReturnType<typeof createLeadStore>;

export const LeadStoreContext = createContext<LeadStoreApi | undefined>(
  undefined
);

export interface LeadStoreProviderProps {
  children: ReactNode;
}

export const LeadStoreProvider = ({ children }: LeadStoreProviderProps) => {
  const storeRef = useRef<LeadStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createLeadStore();
  }

  return (
    <LeadStoreContext.Provider value={storeRef.current}>
      {children}
    </LeadStoreContext.Provider>
  );
};

export const useLeadStore = <T,>(selector: (store: LeadStore) => T): T => {
  const leadStoreContext = useContext(LeadStoreContext);

  if (!leadStoreContext) {
    throw new Error(`useLeadStore must be used within LeadStoreProvider`);
  }

  return useStore(leadStoreContext, selector);
};

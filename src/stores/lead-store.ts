import { Lead } from "@/lib/types";
import { createStore } from "zustand/vanilla";

export type LeadState = {
  leads: Lead[];
};

export type Status = "PENDING" | "REACHED_OUT";

export type LeadActions = {
  setLeads: (leads: Lead[]) => void;
  changeStatus: (id: number, status: Status) => void;
};

export const defaultInitialState: LeadState = {
  leads: [],
};

export type LeadStore = LeadState & LeadActions;

export function createLeadStore(initialState: LeadState = defaultInitialState) {
  return createStore<LeadStore>()((set) => ({
    ...initialState,
    setLeads: (leads: Lead[]) => set(() => ({ leads })),
    changeStatus: (id, status) =>
      set((state) => ({
        ...state,
        leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
      })),
  }));
}

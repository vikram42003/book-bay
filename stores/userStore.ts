import { UserType } from "@/types/types";
import { createStore } from "zustand/vanilla";

// followed https://zustand.docs.pmnd.rs/guides/nextjs
// + added logic for a combined store provider

export type UserStoreState = {
  user: UserType | null;
};

export type UserStoreActions = {
  setUser: (user: UserType | null) => void;
};

export type UserStore = UserStoreState & UserStoreActions;

export const defaultInitState: UserStoreState = {
  user: null,
};

export const createUserStore = (initState: UserStoreState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user: UserType | null) => set({ user }),
  }));
};

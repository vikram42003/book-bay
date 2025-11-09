// user-store.ts
import { UserType } from "@/types/types";
import { useContext } from "react";
import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

import { StoresContext } from "./storeProvider";

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

export const useUserStore = <T>(selector: (store: UserStore) => T): T => {
  const storesContext = useContext(StoresContext);

  if (!storesContext) {
    throw new Error(`useUserStore must be used within StoreProvider`);
  }

  return useStore(storesContext.userStore, selector);
};

"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createUserStore, type UserStore } from "@/stores/userStore";
import { createOrderStore, type OrderStore } from "@/stores/orderStore";

// type for all my stores
export type CombinedStores = {
  userStore: ReturnType<typeof createUserStore>;
  orderStore: ReturnType<typeof createOrderStore>;
};

export const StoresContext = createContext<CombinedStores | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<CombinedStores | null>(null);
  if (storeRef.current == null) {
    storeRef.current = {
      userStore: createUserStore(),
      orderStore: createOrderStore(),
    };
  }

  // This is the correct pattern for initializing refs only one, source - https://zustand.docs.pmnd.rs/guides/nextjs#app-router
  // eslint-disable-next-line react-hooks/refs
  return <StoresContext.Provider value={storeRef.current}>{children}</StoresContext.Provider>;
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const storesContext = useContext(StoresContext);

  if (!storesContext) {
    throw new Error(`useUserStore must be used within StoreProvider`);
  }

  return useStore(storesContext.userStore, selector);
};

export const useOrderStore = <T,>(selector: (store: OrderStore) => T): T => {
  const storesContext = useContext(StoresContext);

  if (!storesContext) {
    throw new Error(`useOrderStore must be used within StoreProvider`);
  }

  return useStore(storesContext.orderStore, selector);
};

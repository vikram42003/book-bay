"use client";

import { type ReactNode, createContext, useState } from "react";
import { createUserStore } from "@/stores/userStore";

// type for all my stores
export type CombinedStores = {
  userStore: ReturnType<typeof createUserStore>;
  // Add more stores here later
  // cartStore: ReturnType<typeof createCartStore>;
};

export const StoresContext = createContext<CombinedStores | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [stores] = useState<CombinedStores>(() => ({
    userStore: createUserStore(),
    // Add more stores here
  }));

  return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
};
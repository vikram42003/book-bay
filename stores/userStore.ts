import { UserType } from "@/types/types";
import { createStore } from "zustand/vanilla";

export type UserStoreState = {
  user: UserType | null;
};

export type UserStoreActions = {
  setUser: (user: UserType | null) => void;
  register: (username: string, password: string, referralCode?: string) => Promise<UserType>;
  login: (username: string, password: string) => Promise<UserType>;
  logout: () => void;
};

export type UserStore = UserStoreState & UserStoreActions;

export const defaultInitState: UserStoreState = {
  user: null,
};

export const createUserStore = (initState: UserStoreState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,

    setUser: (user: UserType | null) => set({ user }),

    register: async (username, password, referralCode) => {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, referralCode }),
      });

      if (!res.ok) throw new Error("Failed to register user");

      const user = (await res.json()) as UserType;
      set({ user });
      return user;
    },

    login: async (username, password) => {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Failed to login");

      const user = (await res.json()) as UserType;
      set({ user });
      return user;
    },

    logout: () => set({ user: null }),
  }));
};

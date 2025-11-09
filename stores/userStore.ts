import { setToken } from "@/lib/authToken";
import ENV from "@/lib/env";
import { UserType, userZodSchema } from "@/types/types";
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
      const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, referralCode }),
      });

      if (!res.ok) throw new Error("Failed to register user");

      const { user, token } = await res.json();

      let parsedUser = null;
      try {
        parsedUser = userZodSchema.parse(user);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to parse user");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(parsedUser));

      setToken(token);
      set({ user: parsedUser });
      return user;
    },

    login: async (username, password) => {
      const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Failed to login");

      const { user, token } = await res.json();

      let parsedUser = null;
      try {
        parsedUser = userZodSchema.parse(user);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to parse user");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(parsedUser));

      setToken(token);
      set({ user: parsedUser });
      return user;
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      set({ user: null });
    },
  }));
};

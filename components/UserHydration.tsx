"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/storeProvider";
import { setToken } from "@/lib/authToken";

// This component's only job is to take the user and token fro localstorage and set it for zustand
export default function UserHydration() {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse stored user", err);
        localStorage.removeItem("user");
      }
    }
  }, [setUser]);

  return null;
}

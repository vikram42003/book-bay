"use client";

import { useUserStore } from "@/stores/userStore";
import { UserType } from "@/types/types";

export default function UserTest() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  return (
    <div>
      <p>Current user: {user ? user.username : "None"}</p>
      <button onClick={() => setUser({ username: "Alice" } as UserType)}>Set User</button>
    </div>
  );
}

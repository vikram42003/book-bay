"use client";

import { useUserStore } from "@/stores/storeProvider";

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  
  if (!user) {
    return <p>Please log in first!</p>;
  }

  
}
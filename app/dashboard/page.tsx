"use client";

import Orders from "@/components/dashboard/Orders";
import ReferralDetails from "@/components/dashboard/ReferralDetails";
import UserNotLoggedIn from "@/components/UserNotLoggedIn";
import { getCurrentUserDetails } from "@/lib/utils";
import { useUserStore } from "@/stores/storeProvider";
import { useEffect } from "react";

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const fetchLatestUserDetails = async () => {
      const newUser = await getCurrentUserDetails();
      setUser(newUser);
    };
    fetchLatestUserDetails();
  }, [setUser]);

  return (
    <div className="max-w-7xl mx-auto flex justify-center py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full text-center flex flex-col items-center">
        {user ? (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-3 justify-center gap-8 w-full max-w-4xl">
              <div className="p-4 border rounded-lg bg-gray-50 flex flex-col justify-between">
                <p className="text-sm text-gray-500">Your Credits</p>
                <p className="text-2xl font-semibold text-blue-600">{user.credits}</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 flex flex-col justify-between">
                <p className="text-sm text-gray-500">Your Referral Code</p>
                <p className="text-lg font-mono text-gray-700 bg-gray-200 px-2 py-1 rounded inline-block mt-1">
                  {user.referralCode}
                </p>
              </div>
              {user.referrerId && <ReferralDetails userId={user.id} />}
            </div>
          </div>
        ) : (
          <>
            <UserNotLoggedIn />
          </>
        )}

        {/* FINISH IMPLEMENTING THIS IF YOU HAVE TIME. THE UTIL FUNC HAS ALREADY BEEN CREATED */}
        <Orders />
      </div>
    </div>
  );
}

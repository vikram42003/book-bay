"use client";

import { getAllOrders } from "@/lib/utils";
import { useUserStore } from "@/stores/storeProvider";
import { OrderType } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const [refferalDetails, setReferralDetails] = useState<{ total: number, converted: number } | null>(null);
  const [orders, setOrders] = useState<OrderType | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const ordersResponse = await getAllOrders();
      const referralDetailsResponse = await 
      console.log(ordersResponse);
      setOrders(ordersResponse);
    };

    if (user) {
      fetchInfo();
    }
  }, [user]);

  return (
    <div className="flex justify-center py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="space-y-4 text-left">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Your Credits</p>
                <p className="text-2xl font-semibold text-blue-600">{user.credits}</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Your Referral Code</p>
                <p className="text-lg font-mono text-gray-700 bg-gray-200 px-2 py-1 rounded inline-block mt-1">
                  {user.referralCode}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">You are not logged in!</h1>
            <p className="text-gray-600">
              Please{" "}
              <Link href="/login" className="font-bold text-blue-500 hover:text-blue-700">
                log in
              </Link>{" "}
              to view your dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

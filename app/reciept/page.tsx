"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RecieptPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const hasReferral = searchParams.get("referral") === "true";

  return (
    <div className="max-w-2xl mx-auto flex justify-center py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full text-gray-800 text-center">
        {status === "success" ? (
          <>
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold mt-4">Purchase Successful!</h1>
            <p className="text-gray-600 mt-2">Thank you for your order.</p>
            {orderId && <p className="text-gray-600 mt-1">Order ID: {orderId}</p>}
            {hasReferral && (
              <p className="text-blue-600 font-semibold mt-4">Congrats! You earned 2 credits for the referral.</p>
            )}
          </>
        ) : (
          <>
            <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold mt-4">Purchase Failed</h1>
            <p className="text-gray-600 mt-2">There was an issue with your purchase. Please try again.</p>
          </>
        )}
        <Link
          href="/"
          className="mt-8 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

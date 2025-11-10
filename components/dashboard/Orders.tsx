"use client";

import { useEffect, useState } from "react";
import { getcurrentUsersAllOrders } from "@/lib/utils";
import { PopulatedOrderType } from "@/types/types";

const Orders = () => {
  const [orders, setOrders] = useState<PopulatedOrderType[] | null>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrdersData = await getcurrentUsersAllOrders();
        setOrders(fetchedOrdersData);
      } catch (error) {
        console.log("Failed to load your orders. Please try again later.");
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  if (!orders) {
    return <p className="text-gray-500 text-center py-4">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-gray-500 text-center py-4">You haven&apos;t placed any orders yet.</p>;
  }

  return (
    <div className="mt-12 w-full max-w-4xl">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Order History</h2>
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="space-y-4">
          {orders.map((order) => {
            const totalItems = order.orderItems?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

            return (
              <>
                <div key={order.id} className="rounded-md flex flex-row justify-between items-center text-left">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Order ID: <span className="font-mono text-blue-600">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-800">₹{order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  {order.orderItems?.map((item) => (
                    <div key={item.id} className="text-sm flex justify-between items-center">
                      <span className="truncate pr-4">
                        <span className="italic">
                          {item.bookId.title} by {item.bookId.author}
                        </span>
                      </span>

                      <span className="text-gray-700">
                        {item.quantity} x ₹{item.priceAtPurchase.toFixed(2)}
                      </span>
                      <span className="font-medium whitespace-nowrap">₹{item.priceAtPurchase.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;

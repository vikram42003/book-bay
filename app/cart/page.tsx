"use client";

import UserNotLoggedIn from "@/components/UserNotLoggedIn";
import { useOrderStore, useUserStore } from "@/stores/storeProvider";

export default function CartPage() {
  const user = useUserStore((s) => s.user);
  const orderItems = useOrderStore((s) => s.orderItems);
  const total = useOrderStore((s) => s.total);

  const cartItemsArray = Array.from(orderItems.values());

  return (
    <div className="max-w-7xl mx-auto flex justify-center py-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full text-gray-800">
        <h1 className="text-2xl text-blue-500 font-bold mb-6">{user ? `${user.username}'s Cart` : "Your Cart"}</h1>
        <div className="space-y-4">
          {cartItemsArray.length > 0 ? (
            cartItemsArray.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border-b">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
        
        {cartItemsArray.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center font-bold text-lg">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
            {user ? (
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Purchase
              </button>
            ) : (
              <div className="mt-6">
                <UserNotLoggedIn />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import UserNotLoggedIn from "@/components/UserNotLoggedIn";
import { purchaseItems } from "@/lib/utils";
import { useOrderStore, useUserStore } from "@/stores/storeProvider";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const MAX_STOCK = 5;

export default function CartPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const orderItems = useOrderStore((s) => s.orderItems);
  const total = useOrderStore((s) => s.total);
  const addItem = useOrderStore((s) => s.addItem);
  const removeItem = useOrderStore((s) => s.removeItem);

  const cartItemsArray = Array.from(orderItems.values());

  const handlePurchase = async () => {
    const { order, referral } = await purchaseItems(cartItemsArray, total);
    const params = new URLSearchParams();
    params.set("status", "success");
    params.set("orderId", order.id);
    if (referral) {
      params.set("referral", "true");
    }
    router.push(`/reciept?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto flex justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full text-gray-800">
        <h1 className="text-2xl text-blue-500 font-bold mb-6">{user ? `${user.username}'s Cart` : "Your Cart"}</h1>

        <div className="space-y-4">
          {cartItemsArray.length > 0 ? (
            cartItemsArray.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center p-4 border-b last:border-b-0"
              >
                <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">by {item.author}</p>
                </div>

                <div className="flex items-center justify-center gap-3 mb-4 sm:mb-0">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-md border-2 border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>

                  <span className="text-lg font-semibold min-w-8 text-center">{item.quantity}</span>

                  <button
                    onClick={() => addItem(item)}
                    disabled={item.quantity >= MAX_STOCK}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border-2 border-blue-500 text-blue-700 transition-colors ${
                      item.quantity >= MAX_STOCK
                        ? "cursor-not-allowed bg-blue-200 text-white border-blue-200"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-full sm:w-1/4 text-center sm:text-right">
                  <p className="font-semibold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{`${item.quantity} × ₹${item.price.toFixed(2)}`}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
          )}
        </div>

        {cartItemsArray.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center font-bold text-xl">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>

            {user ? (
              <button
                onClick={() => handlePurchase()}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
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

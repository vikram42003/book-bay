"use client";

import Image from "next/image";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { BookType } from "@/types/types";
import { useOrderStore } from "@/stores/storeProvider";

const MAX_STOCK = 5;

const Book = ({ book }: { book: BookType }) => {
  const addItem = useOrderStore((state) => state.addItem);
  const removeItem = useOrderStore((state) => state.removeItem);
  const quantity = useOrderStore((state) => state.orderItems.get(book.id)?.quantity ?? 0);

  return (
    <div className="bg-blue-100 p-6 rounded-xl shadow-[3px_3px_0px_5px_#a1bae3] flex flex-col justify-between hover:scale-102 transition-transform duration-300">
      <div className="h-50 w-full relative">
        <Image src={book.image} alt={`Image of ${book.title}`} fill className="object-cover rounded-md px-4" />
      </div>

      <div className="mt-2 text-sm flex flex-col">
        <span className="font-semibold truncate">{book.title}</span>
        <span className="text-gray-600 truncate">{book.author}</span>
        <span className="font-bold mt-2">₹{book.price.toFixed(2)}</span>
      </div>

      <div className="mt-3">
        {quantity === 0 ? (
          <button
            onClick={() => addItem(book)}
            className="w-full border-2 border-blue-500 hover:bg-blue-500 text-blue-700 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => removeItem(book.id)}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white transition-colors"
            >
              <MinusIcon className="w-5 h-5" />
            </button>

            <span className="text-lg font-semibold min-w-8 text-center">{quantity}</span>

            <button
              onClick={() => addItem(book)}
              disabled={quantity >= MAX_STOCK}
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-700 transition-colors ${
                quantity >= MAX_STOCK
                  ? "cursor-not-allowed bg-blue-200 text-white border-blue-200"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;

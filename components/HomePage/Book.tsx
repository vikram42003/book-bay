"use client";

import Image from "next/image";
import { BookType } from "@/types/types";
import { useOrderStore } from "@/stores/storeProvider";
import { useShallow } from "zustand/shallow";

const Book = ({ book }: { book: BookType }) => {
  // ✅ These are fine because they return primitives/stable references
  const addItem = useOrderStore((state) => state.addItem);
  const removeItem = useOrderStore((state) => state.removeItem);
  // ✅ Only subscribe to the specific item you need
  const quantity = useOrderStore((state) => state.orderItems.get(book.id)?.quantity ?? 0);

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-[2px_2px_5px_5px_#deeafc] flex flex-col justify-between">
      <div className="h-72 w-full relative">
        <Image src={book.image} alt={`Image of ${book.title}`} fill className="object-cover rounded-md p-4" />
      </div>

      <div className="mt-2 text-sm flex flex-col">
        <span className="font-semibold truncate">{book.title}</span>
        <span className="text-gray-600 truncate">{book.author}</span>
        <span className="font-bold mt-1">${book.price}</span>
      </div>

      <div>
        {!quantity ? (
          <button onClick={() => addItem(book.id, book.price)}>Add to cart</button>
        ) : (
          <button onClick={() => removeItem(book.id)}>Remove item</button>
        )}
      </div>
    </div>
  );
};

export default Book;

import Image from "next/image";

import { fetchAllBooks } from "@/lib/utils";
import { BookType } from "@/types/types";

const BooksGrid = async () => {
  const books: BookType[] = await fetchAllBooks(300);

  return (
    <div className="max-w-7xl my-12 mx-auto grid grid-cols-4 gap-12">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
};

const Book = ({ book }: { book: BookType }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-[2px_2px_5px_5px_#deeafc] flex flex-col justify-between">
      <div className="h-72 w-full relative">
        <Image
          src={book.image}
          alt={`Image of ${book.title}`}
          fill
          className="object-cover rounded-md p-4"
        />
      </div>

      <div className="mt-2 text-sm flex flex-col">
        <span className="font-semibold truncate">{book.title}</span>
        <span className="text-gray-600 truncate">{book.author}</span>
        <span className="font-bold mt-1">${book.price}</span>
      </div>

      <div>
        <button>Add to cart</button>
      </div>
    </div>
  );
};


export default BooksGrid;

import { fetchAllBooks } from "@/lib/utils";
import { BookType } from "@/types/types";
import Book from "./Book";

const BooksGrid = async () => {
  const books: BookType[] = await fetchAllBooks(300);

  return (
    <div className="max-w-7xl my-16 mx-auto grid grid-cols-5 gap-12">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
};


export default BooksGrid;

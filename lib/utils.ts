import { BookType, bookZodSchema } from "@/types/types";
import ENV from "./env";

export const fetchAllBooks = async (revalidateTime: number = 300): Promise<BookType[]> => {
  const res = await fetch(ENV.NEXT_API_URL + "/api/books", { next: { revalidate: revalidateTime } });
  const books = await res.json();
  try {
    const parsedBooks = books.map((book: unknown) => bookZodSchema.parse(book));
    return parsedBooks;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch books");
  }
};

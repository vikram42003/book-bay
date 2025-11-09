import { BookType, bookZodSchema, OrderType, orderZodSchema } from "@/types/types";
import ENV from "./env";
import { getToken } from "./authToken";

export const fetchAllBooks = async (revalidateTime: number = 300): Promise<BookType[]> => {
  const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/books", { next: { revalidate: revalidateTime } });
  const books = await res.json();
  try {
    const parsedBooks = books.map((book: unknown) => bookZodSchema.parse(book));
    return parsedBooks;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch books");
  }
};

export const getAllOrders = async (): Promise<OrderType> => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. User may not be logged in!");
  }

  const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  const orders = await res.json();
  try {
    const parsedOrders = orders.map((order: unknown) => orderZodSchema.parse(order));
    return parsedOrders;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to parse orders");
  }
};

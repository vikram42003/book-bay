import {
  BookType,
  bookZodSchema,
  OrderItemInput,
  OrderType,
  orderZodSchema,
  PopulatedOrderType,
  populatedOrderZodSchema,
  ReferralType,
  referralZodSchema,
  UserType,
  userZodSchema,
} from "@/types/types";
import ENV from "./env";
import { getToken } from "./authToken";
import { OrderStoreItem } from "@/stores/orderStore";

// All utils throw an error if something goes wrong so that closest error boundary can handle it

export const fetchAllBooks = async (revalidateTime: number = 300): Promise<BookType[]> => {
  const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/books", { next: { revalidate: revalidateTime } });
  const books = await res.json();
  const parsedBooks = books.map((book: unknown) => bookZodSchema.parse(book));
  return parsedBooks;
};

export const getcurrentUsersAllOrders = async (): Promise<PopulatedOrderType[]> => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. User may not be logged in!");
  }

  const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  const orders = await res.json();

  console.log(orders);
  const parsedOrders = orders.map((order: unknown) => populatedOrderZodSchema.parse(order));
  return parsedOrders;
};

export const getReferralDetails = async (referrerId: string): Promise<{ total: number; converted: number }> => {
  const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/referrals/stats/" + referrerId);
  const referrals = await res.json();

  if (
    referrals.total == null ||
    referrals.converted == null ||
    typeof referrals.total !== "number" ||
    typeof referrals.converted !== "number"
  )
    throw new Error("Failed to fetch referrals");

  return { total: referrals.total, converted: referrals.converted };
};

// Discound feature has not been implemented since this project has already taken a of time and effort
export const purchaseItems = async (
  orderItems: OrderStoreItem[],
  total: number,
  discount: number = 0
): Promise<{ order: OrderType; referral?: ReferralType }> => {
  const orderItemInput: OrderItemInput[] = orderItems.map((item) => ({
    bookId: item.id,
    quantity: item.quantity,
  }));

  const token = getToken();

  const rawRes = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: orderItemInput,
      total,
      discount,
    }),
  });

  const res = await rawRes.json();

  const parsedOrder = orderZodSchema.parse(res.order);
  let parsedReferral;
  if (res.referral) {
    parsedReferral = referralZodSchema.parse(res.referral);
  }
  return { order: parsedOrder, referral: parsedReferral };
};

export const getCurrentUserDetails = async (): Promise<UserType> => {
  const token = getToken();
  const res = await fetch(ENV.NEXT_PUBLIC_API_URL + "/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await res.json();
  const parsedUser = userZodSchema.parse(user);
  return parsedUser;
};

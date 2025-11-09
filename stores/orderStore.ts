import { createStore } from "zustand/vanilla";
import { OrderItemInput } from "@/types/types";

// followed https://zustand.docs.pmnd.rs/guides/nextjs
// + added logic for a combined store provider

export type OrderStoreItem = OrderItemInput & {
  price: number;
};

export type OrderStoreState = {
  orderItems: Map<string, OrderStoreItem>;
  total: number;
};

export type OrderStoreActions = {
  addItem: (bookId: string, price: number, quantity?: number) => void;
  removeItem: (bookId: string, quantity?: number) => void;
  clearItem: (bookId: string) => void;
  clearOrder: () => void;
  getOrderItemsArray: () => OrderItemInput[];
};

export type OrderStore = OrderStoreState & OrderStoreActions;

export const defaultInitState: OrderStoreState = {
  orderItems: new Map(),
  total: 0,
};

const calculateTotal = (items: Map<string, OrderStoreItem>): number => {
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

export const createOrderStore = (initState: OrderStoreState = defaultInitState) => {
  return createStore<OrderStore>()((set, get) => ({
    ...initState,

    addItem: (bookId: string, price: number, quantity: number = 1) =>
      set((state) => {
        const newItems = new Map(state.orderItems);
        const existingItem = newItems.get(bookId);

        if (existingItem) {
          newItems.set(bookId, {
            bookId,
            quantity: existingItem.quantity + quantity,
            price,
          });
        } else {
          newItems.set(bookId, { bookId, quantity, price });
        }

        const total = calculateTotal(newItems);
        return { orderItems: newItems, total };
      }),

    removeItem: (bookId: string, quantity: number = 1) =>
      set((state) => {
        const newItems = new Map(state.orderItems);
        const existingItem = newItems.get(bookId);

        if (!existingItem) return state;

        const newQty = Math.max(0, existingItem.quantity - quantity);

        if (newQty === 0) {
          newItems.delete(bookId);
        } else {
          newItems.set(bookId, { ...existingItem, quantity: newQty });
        }

        const total = calculateTotal(newItems);
        return { orderItems: newItems, total };
      }),

    clearItem: (bookId: string) =>
      set((state) => {
        const newItems = new Map(state.orderItems);
        newItems.delete(bookId);
        const total = calculateTotal(newItems);
        return { orderItems: newItems, total };
      }),

    clearOrder: () => set({ orderItems: new Map(), total: 0 }),

    getOrderItemsArray: () => {
      const items = get().orderItems;
      return Array.from(items.values()).map(({ bookId, quantity }) => ({
        bookId,
        quantity,
      }));
    },
  }));
};

"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface CartItem {
  variant_id: string;
  product_id: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  unit_price_ron: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variant_id: string, size: string) => void;
  updateQuantity: (variant_id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalCount: 0,
  totalPrice: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.variant_id === item.variant_id && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.variant_id === item.variant_id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((variant_id: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.variant_id === variant_id && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (variant_id: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(variant_id, size);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.variant_id === variant_id && i.size === size
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.quantity * i.unit_price_ron,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

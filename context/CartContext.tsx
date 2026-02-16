"use client";

import { CartItem } from "@/type";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartContextType = {
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartKey: string) => void;
  clearCart: () => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
};

// ------------------ DEFAULT VALUE ------------------
const CartContext = createContext<CartContextType | null>(null);

// ------------------ PROVIDER ------------------
export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("orderData");
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("orderData", JSON.stringify(cart));
    }
  }, [cart]);

  // ------------------ UNIQUE CART KEY ------------------
  const generateCartKey = (item: CartItem) => {
    // Two cakes are same if id + size + flavor + messageOn matches
    return `${item.id}-${item.size}-${item.flavor || ""}-${item.messageOn}`;
  };

  // ------------------ TOTALS ------------------
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // ------------------ ADD TO CART ------------------
  const addToCart = (newItem: CartItem) => {
    const newCartKey = generateCartKey(newItem);

    setCart((prev) => {
      const existing = prev.find(
        (item) => generateCartKey(item) === newCartKey
      );

      if (existing) {
        return prev.map((item) =>
          generateCartKey(item) === newCartKey
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...prev, { ...newItem, cartKey: newCartKey }];
    });
  };

  // ------------------ REMOVE FROM CART ------------------
  const removeFromCart = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => generateCartKey(item) !== cartKey));
  };

  // ------------------ UPDATE QUANTITY ------------------
  const updateQuantity = (cartKey: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        generateCartKey(item) === cartKey
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // ------------------ CLEAR CART ------------------
  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined") localStorage.removeItem("orderData");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        totalItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ------------------ HOOK ------------------
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartContextProvider");
  return ctx;
};

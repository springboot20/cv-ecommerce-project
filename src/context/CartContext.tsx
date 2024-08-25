import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { CartContextType } from "../types/context.types";
import { CartTypes, ProductType } from "../types/index";
import { toast } from "react-toastify";

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

const getCartFromLocalStorage = () => {
  const cartItems =
    localStorage.getItem("cart") === null
      ? (localStorage.setItem(
          "cart",
          JSON.stringify([]),
        ) as unknown as CartTypes[])
      : JSON.parse(localStorage.getItem("cart") as string);

  return cartItems;
};

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartTypes[]>(() =>
    getCartFromLocalStorage(),
  );
  const [isNewItemAdded, setIsNewItemAdded] = useState<boolean>(false);

  const addToCart = useCallback(
    (p: { product: ProductType; quantity: number }) => {
      try {
        const itemExists = cartItems.find(
          (item) => item.product.id === p.product.id,
        );
        if (itemExists) {
          const updatedCart = cartItems.map((item) =>
            item.product.id === item.product.id
              ? { ...item, quantity: item.quantity + p.quantity }
              : item,
          );
          setCartItems(updatedCart);
          setIsNewItemAdded(true);
          console.log(cartItems);
        } else {
          const newCartItem: CartTypes = { ...p };
          setCartItems([...cartItems, newCartItem]);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          toast.error(err.message);
        }
      }
    },
    [cartItems],
  );

  const updateCartItemQuantity = useCallback(
    (productId: number, quantity: number) => {
      const updatedCartItems = cartItems.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: quantity,
          };
        }
        return item;
      });

      setCartItems(updatedCartItems);
    },
    [cartItems],
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      const updatedCart = cartItems.filter(
        (item) => item.product.id !== productId,
      );
      setCartItems(updatedCart);
    },
    [cartItems],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartValues = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      isNewItemAdded,
      setIsNewItemAdded,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      isNewItemAdded,
      setIsNewItemAdded,
    ],
  );

  return (
    <CartContext.Provider value={cartValues}>{children}</CartContext.Provider>
  );
};

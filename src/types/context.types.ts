import { CartTypes, ProductType } from './index';
export interface AuthContextType {
  token: string | null;
  createToken: (newToken: string) => string | null;
}

export type AuthContextProps = {
  children: React.ReactNode;
};

export type CartContextType = {
  cartItems: CartTypes[];
  addToCart: (p: { product: ProductType; quantity: number }) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export type ProductContextType = {
  products: ProductType[];
  categories: { name: string; image: string; id: number | string }[];
  isLoading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  itemsPerPage: number;
};

import { UserInterface } from './user.types';

export interface AuthContextInterface {
  tokens: { access_token: string; refresh_token: string } | null;
  user: UserInterface | null;
  register: (data: { username: string; email: string; password: string }) => void;
  login: (data: { username?: string; email?: string; password: string }) => void;
  logout: () => void;
}

export type AuthProviderProps = {
  children: React.ReactNode;
};

export interface CartContextInterface {
  items:
    | {
        quantity: number;
        productId: string;
      }[]
    | null;
  getUserCart: () => void;
  addItemOrUpdateItemQuantity: (data: { quantity: number }) => void;
  removeItemFromCart: () => void;
  clearCart: () => void;
}

export interface ProductContextInterface {
  getAllProducts: () => void;
  createProduct: (data: {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
  }) => void;
}

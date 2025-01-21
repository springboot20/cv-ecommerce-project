import { ProductType } from "./product";

export interface InitialState {
  cartItem: CartInterface;
  isNewAddedToCart: boolean;
}

export interface CartInterface {
  _id: string;
  items: Array<{
    _id: string;
    product: ProductType;
    quantity: number;
  }>;
  totalCart: number;
}

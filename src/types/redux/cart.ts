export interface InitialState {
  cartItems: CartInterface[];
  isNewAddedToCart: boolean;
}

export interface CartInterface {
  _id: string;
  items: Array<{
    _id: string;
    productId: string;
    quantity: number;
  }>;
  totalCart: number;
}

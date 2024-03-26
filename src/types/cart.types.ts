import { ProductInterface } from './product.types';
import { UserInterface } from './user.types';

export interface CartInterface {
  _id: string;
  owner: UserInterface | null;
  items:
    | Array<{
        quantity: number;
        product: ProductInterface;
      }>
    | [];
  discountedPrice: number;
  cartTotal: number;
}

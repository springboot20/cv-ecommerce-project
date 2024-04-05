import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartTypes } from '../../types';
import { LocalStorage } from '../../util';

type InitialState = {
  cart: CartTypes | undefined;
};

const initialState: InitialState = {
  cart: undefined,
};

type CartPayload = {
  cart: CartTypes;
};

const CartSliceReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartToLocalStorage: (state, action: PayloadAction<CartPayload>) => {
      state.cart = action.payload.cart;

      LocalStorage.set('cart', state.cart);
    },
  },
});
export default CartSliceReducer.reducer;
export const { setCartToLocalStorage } = CartSliceReducer.actions;

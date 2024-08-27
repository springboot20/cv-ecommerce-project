import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { CartInterface, InitialState } from "../../types/redux/cart";
import { CartSlice } from "./cart.slice";

const initialState: InitialState = {
  cartItems: LocalStorage.get("cart") as CartInterface[],
  isNewAddedToCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(CartSlice.endpoints.addItemToCart.matchFulfilled, (state, { payload }) => {
      const { data } = payload;

      state.cartItems.push(data.cart);
      state.isNewAddedToCart = true;

      LocalStorage.set("cart", state.cartItems);
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const {} = cartSlice.actions;

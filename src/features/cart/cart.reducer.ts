import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { CartInterface, InitialState } from "../../types/redux/cart";
import { CartSlice } from "./cart.slice";

const initialState: InitialState = {
  cartItem: LocalStorage.get("cart") as CartInterface,
  isNewAddedToCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      const { data } = payload;
      
      state.cartItem = data.cart;
      state.isNewAddedToCart = true;

      LocalStorage.set("cart", data.cart);
    },
    removeItemFromCart: (state, { payload }) => {
      const { data } = payload;

      state.cartItem = data.cart;
      state.isNewAddedToCart = false;

      LocalStorage.set("cart", data.cart);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(CartSlice.endpoints.getUserCart.matchFulfilled, (state, { payload }) => {
      const { data } = payload;

      state.cartItem = data.cart;

      LocalStorage.set("cart", data.cart);
    });

    // builder.addMatcher(CartSlice.endpoints.addItemToCart.matchFulfilled, (state, { payload }) => {
    //   const { data } = payload;

    //   state.cartItem = data.cart;
    //   state.isNewAddedToCart = true;

    //   LocalStorage.set("cart", data.cart);
    // });

    // builder.addMatcher(CartSlice.endpoints.removeItemFromCart.matchFulfilled, (state, { payload }) => {
    //   const { data } = payload;

    //   state.cartItem = data.cart;
    //   state.isNewAddedToCart = false;

    //   LocalStorage.set("cart", data.cart);
    // });
  },
});

export const cartReducer = cartSlice.reducer;
export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

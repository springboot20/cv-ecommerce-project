import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { InitialState } from "../../types/redux/cart";

const initialState: InitialState = {
  cartItems: [],
  isNewAddedToCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (_) => {},
});

export const cartReducer = cartSlice.reducer;
export const {} = cartSlice.actions;

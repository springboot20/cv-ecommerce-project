import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { CartInterface, InitialState } from "../../types/redux/cart";

const initialState: InitialState = {
  cartItems: LocalStorage.get("cart") as CartInterface[],
  isNewAddedToCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => ({}),
});

export const cartReducer = cartSlice.reducer;

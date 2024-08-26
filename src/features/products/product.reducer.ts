import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { InitialState, ProductType } from "../../types/redux/product";

const initialState: InitialState = {
  products: LocalStorage.get("products") ?? ({} as ProductType[]),
  product: LocalStorage.get("product") ?? ({} as ProductType),
  requestedId: undefined,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (_) => {},
});

export const authReducer = productSlice.reducer;
export const {} = productSlice.actions;

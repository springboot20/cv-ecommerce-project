import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { ProductSlice } from "./product.slice";
import { ProductType } from "../../types/redux/product";

const initialState = {
  products: LocalStorage.get("products") as ProductType[],
  product: LocalStorage.get("product") as ProductType,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ProductSlice.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.products = data.products;

        LocalStorage.set("products", data.products);
      },
    );

    builder.addMatcher(
      ProductSlice.endpoints.getProductById.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.product = data.product;

        LocalStorage.set("product", data.product);
      },
    );
  },
});

export const productReducer = productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { OrderStatsResponse } from "../../types/redux/order";
import { OrderSlice } from "./order.slice";

interface InitialState {
  statistics: OrderStatsResponse;
}

const initialState: InitialState = {
  statistics: LocalStorage.get("order-stats") as OrderStatsResponse,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(OrderSlice.endpoints.getOrderStats.matchFulfilled, (state, { payload }) => {
      const { data } = payload;

      state.statistics = data?.statistics;

      LocalStorage.set("order-stats", data.statistics);
    });
  },
});

export const ordersReducer = orderSlice.reducer;

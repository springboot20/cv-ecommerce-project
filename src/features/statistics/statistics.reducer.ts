import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { AllStatsInterface, OrderStatsResponse } from "../../types/redux/order";
import { StatisticsSlice } from "./statistics.slice";

interface InitialState {
  statistics: {
    orders: OrderStatsResponse;
    allStats: AllStatsInterface;
  };
}

const initialState: InitialState = {
  statistics: {
    orders: LocalStorage.get("order-stats") as OrderStatsResponse,
    allStats: LocalStorage.get("all-stats") as AllStatsInterface,
  },
};

const statisticsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      StatisticsSlice.endpoints.getOrderStats.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.statistics.orders = data?.statistics;

        LocalStorage.set("order-stats", data.statistics);
      },
    );

    builder.addMatcher(
      StatisticsSlice.endpoints.getAllStats.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.statistics.allStats = data?.statistics;

        LocalStorage.set("all-stats", data.statistics);
      },
    );
  },
});

export const statisticsReducer = statisticsSlice.reducer;

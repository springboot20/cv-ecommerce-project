import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { AddressInterface } from "../../types/redux/order";
import { AddressSlice } from "./address.slice";

interface InitialState {
  address: AddressInterface;
  saveInfo: boolean;
}

const initialState: InitialState = {
  address: LocalStorage.get("address") as AddressInterface,
  saveInfo: LocalStorage.get("user-address") as boolean,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    saveUserAddressInfo: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;

      state.saveInfo = payload;

      LocalStorage.set("user-address", payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AddressSlice.endpoints.getUserAddress.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        state.address = data.address;

        LocalStorage.set("cart", data.address);
      },
    );
  },
});

export const addressReducer = addressSlice.reducer;
export const { saveUserAddressInfo } = addressSlice.actions;

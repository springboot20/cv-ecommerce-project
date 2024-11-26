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

type PayloadActionType = {
  saveInfo: boolean;
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    saveUserAddressInfo: (state, action: PayloadAction<PayloadActionType>) => {
      const { payload } = action;

      state.saveInfo = payload.saveInfo;

      LocalStorage.set("saveInfo", payload.saveInfo);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AddressSlice.endpoints.getUserAddress.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;

        if (state.saveInfo) {
          state.address = data.address;

          LocalStorage.set("user-address", data.address);
        }

        console.log(state.saveInfo);
      },
    );
  },
});

export const addressReducer = addressSlice.reducer;
export const { saveUserAddressInfo } = addressSlice.actions;

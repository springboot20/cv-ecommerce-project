import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { InitialState, Token, User } from "../../types/redux/auth";
import { AuthSlice } from "./auth.slice";

const initialState: InitialState = {
  tokens: LocalStorage.get("tokens") as Token,
  user: LocalStorage.get("user") as  User,
  isAuthenticated: LocalStorage.get("authentified") as boolean,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Login builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { data } = payload;

      state.isAuthenticated = true;
      state.user = data.user;
      state.tokens = data.tokens;

      LocalStorage.set("user", data.user);
      LocalStorage.set("authentified", data.user.isAuthenticated);
      LocalStorage.set("tokens", data.tokens);
    });
  },
});

export const authReducer = authSlice.reducer;

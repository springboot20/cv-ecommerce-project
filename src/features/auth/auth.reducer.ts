import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";
import { InitialState, Token, User } from "../../types/redux/auth";
import { AuthSlice } from "./auth.slice";
import { jwtDecode } from "jwt-decode";

const initialState: InitialState = {
  tokens: LocalStorage.get("tokens") as Token,
  user: LocalStorage.get("user") as User,
  isAuthenticated: LocalStorage.get("authentified") as boolean,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticationExpires: (state, action: PayloadAction<string>) => {
      try {
        if (!action.payload) {
          state.isAuthenticated = false;
          return;
        }

        const decodedToken = jwtDecode(action.payload);
        const expirationTime = decodedToken?.exp!;

        console.log(Date.now() >= expirationTime * 1000)

        if (Date.now() >= expirationTime * 1000) {
          state.isAuthenticated = false;
          return;
        }

        state.isAuthenticated = true;
        LocalStorage.set("authentified", state.isAuthenticated);
      } catch (error) {
        console.log(error);
      }
    },
  },
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

    /**
     * Login builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = null;

      LocalStorage.set("user", null);
      LocalStorage.set("authentified", false);
      LocalStorage.set("tokens", null);
    });
  },
});

export const authReducer = authSlice.reducer;
export const { authenticationExpires } = authSlice.actions;

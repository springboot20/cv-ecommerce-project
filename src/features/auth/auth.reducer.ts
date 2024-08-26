import { createSlice } from "@reduxjs/toolkit";
import { InitialState, Token, User } from "../../types/redux/auth";
import { LocalStorage } from "../../util";
import { AuthSlice } from "./auth.slice";

const initialState: InitialState = {
  loading: "idle",
  data: {
    tokens: LocalStorage.get("tokens") ?? ({} as Token),
    user: LocalStorage.get("user") ?? ({} as User),
  },
  requestedId: undefined,
  isAuthenticated: LocalStorage.get("authentified") as boolean,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Login build case matcher
     */

    builder.addMatcher(AuthSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { data } = payload;

      state.isAuthenticated = true;
      state.data.user = data.user;
      state.data.tokens = data.tokens;
      state.isAuthenticated = data.user.isAuthenticated;

      LocalStorage.set("user", data.user);
      LocalStorage.set("tokens", data.tokens);
      LocalStorage.set("authentified", data.isAuthenticated);
    });

    /**
     * Logout build case matcher
     */

    builder.addMatcher(AuthSlice.endpoints.logout.matchFulfilled, (state) => {
      state.isAuthenticated = true;
      state.data.user = null;
      state.data.tokens = null;

      LocalStorage.remove("user");
      LocalStorage.remove("tokens");
      LocalStorage.remove("authentified");
    });
  },
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;

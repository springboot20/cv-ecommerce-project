import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStorage } from "../../util";
import { InitialState, Token, User } from "../../types/redux/auth";
import { AuthSlice } from "./auth.slice";
import { jwtDecode } from "jwt-decode";

const getInitialState = (): InitialState => ({
  tokens: AuthStorage.get("tokens") as Token,
  user: AuthStorage.get("user") as User,
  isAuthenticated: AuthStorage.get("authentified") as boolean,
});

const initialState: InitialState = getInitialState();

const updateAuthState = (state: InitialState, { tokens, user }: { tokens: Token; user?: User }) => {
  state.tokens = tokens;
  state.user = user || null;
  state.isAuthenticated = true;

  AuthStorage.set("tokens", tokens);
  AuthStorage.set("user", user);
  AuthStorage.set("authentified", state.isAuthenticated);
};

const clearAuthState = (state: InitialState) => {
  state.isAuthenticated = false;
  state.tokens = null;
  state.user = null;

  AuthStorage.clear();
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

        const decodedToken = jwtDecode<{ exp: number }>(action.payload);
        const expirationTime = decodedToken?.exp;

        if (!expirationTime || Date.now() >= expirationTime * 1000) {
          state.isAuthenticated = false;
        } else {
          state.isAuthenticated = true;
        }

        AuthStorage.set("authentified", state.isAuthenticated);
      } catch (error) {
        console.error("Error decoding token:", error);
        state.isAuthenticated = false;
      }
    },
  },
  extraReducers: (builder) => {
    /**
     * Register builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.register.matchFulfilled, (state, { payload }) => {
      updateAuthState(state, { tokens: null!, user: payload.data.user });
    });

    /**
     * Create Password builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.createPassword.matchFulfilled, (state, { payload }) => {
      updateAuthState(state, { tokens: null!, user: payload.data.user });
    });

    /**
     * Login builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
      updateAuthState(state, { tokens: payload.data.tokens, user: payload.data.user });
    });

    /**
     * Logout builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.logout.matchFulfilled, (state) => {
      clearAuthState(state);
    });
  },
});

export const authReducer = authSlice.reducer;
export const { authenticationExpires } = authSlice.actions;

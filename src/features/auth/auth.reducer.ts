import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStorage, LocalStorage } from "../../util";
import { InitialState, Token, User } from "../../types/redux/auth";
import { AuthSlice } from "./auth.slice";
import { jwtDecode } from "jwt-decode";

const getInitialState = (): InitialState => ({
  tokens: AuthStorage.get("tokens") as Token,
  user: AuthStorage.get("user") as User,
  admin: AuthStorage.get("admin-user") as User,
  isAuthenticated: AuthStorage.get("authentified") as boolean,
});

const initialState: InitialState = getInitialState();

const updateAuthState = (
  state: InitialState,
  { tokens, user, admin }: { tokens: Token; user?: User; admin?: User },
) => {
  state.tokens = tokens;
  state.user = user || null;
  state.admin = admin || null;
  state.isAuthenticated = true;

  AuthStorage.set("tokens", tokens);
  AuthStorage.set("user", user);
  AuthStorage.set("admin-user", admin);
  AuthStorage.set("authentified", state.isAuthenticated);
};

const clearAuthState = (state: InitialState) => {
  state.isAuthenticated = false;
  state.tokens = null;
  state.user = null;
  state.admin = null;

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

    setCredentials: (
      state,
      action: PayloadAction<{ tokens: Token; user?: User; admin?: User }>,
    ) => {
      state.tokens = action.payload.tokens;

      if (action.payload.user) {
        state.user = action.payload.user;
        state.admin = null;
      } else if (action.payload.admin) {
        state.admin = action.payload.admin;
        state.user = null;
      }

      state.isAuthenticated = true;
      LocalStorage.set("tokens", state.tokens);
      LocalStorage.set("user", state.user);
      LocalStorage.set("admin-user", state.admin);
      LocalStorage.set("authentified", state.isAuthenticated);
    },
  },
  extraReducers: (builder) => {
    /**
     * Login builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
      updateAuthState(state, { tokens: payload.data.tokens, user: payload.data.user });
    });

    /**
     * Admin Login builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.adminLogin.matchFulfilled, (state, { payload }) => {
      updateAuthState(state, { tokens: payload.data.tokens, admin: payload.data.user });
    });

    /**
     * Logout builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.logout.matchFulfilled, (state) => {
      clearAuthState(state);
    });

    /**
     * Admin Logout builder casing
     */
    builder.addMatcher(AuthSlice.endpoints.adminLogout.matchFulfilled, (state) => {
      clearAuthState(state);
    });
  },
});

export const authReducer = authSlice.reducer;
export const { authenticationExpires, setCredentials } = authSlice.actions;

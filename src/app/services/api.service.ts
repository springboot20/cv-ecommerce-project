import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LocalStorage } from "../../util";
import { Token } from "../../types/redux/auth";

const env = import.meta.env;

export const ApiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.MODE === "development" ? env.VITE_API_BASE_URL_DEV : env.VITE_API_BASE_URL_PROD,
    prepareHeaders: (headers) => {
      const tokens = LocalStorage.get("tokens") as Token;
      if (tokens) {
        headers.set("authorization", `Bearer ${tokens?.access_token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "Product", "Cart", "Category"],
  endpoints: () => ({}),
});

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    let message =
      "data" in action.error
        ? (action.error.data as { message: string }).message
        : action.error.message;
    console.warn("We got a rejected action!");
    toast.warn(message);
  }

  return next(action);
};

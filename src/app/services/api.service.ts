import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const ApiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5050/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.data.tokens.accessToken;

      if (accessToken) {
        headers.set("authorrzation", "");
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Product"],
  endpoints: () => ({}),
});

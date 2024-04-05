/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const tokens = (getState() as RootState).auth.tokens;
      if (tokens) {
        headers.set('authorization', `Bearer ${tokens.accessToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ['User', 'Product', 'Cart', 'Order'],
  endpoints: (_builder) => ({}),
});

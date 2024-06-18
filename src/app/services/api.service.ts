/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const tokens = (getState() as RootState).auth.tokens;
      if (tokens) {
        headers.set('authorization', `Bearer ${tokens.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Product', 'Cart', 'Order', 'Context'],
  endpoints: (_builder) => ({}),
});

import type { UserTypes, AuthRegisterPayload, AuthLoginPayload, AuthStateType } from '../../types';
import { ApiSlice } from '../../app/services/api.service';

export const AuthEndPoints = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthStateType, AuthRegisterPayload>({
      query: (data) => ({
        url: `/users`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthStateType, AuthLoginPayload>({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    getCurrentUser: builder.query<UserTypes, Pick<UserTypes, 'id'>>({
      query: ({ id }) => ({ url: `/users/${id}` }),
      transformResponse: (response: { data: UserTypes }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthEndPoints;

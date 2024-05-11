import type {
  UserTypes,
  AuthRegisterPayload,
  AuthLoginPayload,
  AuthStateType,
  ResponseObj,
} from '../../types';
import { ApiSlice } from '../../app/services/api.service';

export const AuthEndPoints = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthStateType & ResponseObj, AuthRegisterPayload>({
      query: (data) => ({
        url: `/users/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthStateType & ResponseObj, AuthLoginPayload>({
      query: (data) => ({
        url: `/users/auth/signin`,
        method: 'POST',
        body: data,
      }),
    }),
    getCurrentUser: builder.query<UserTypes, Pick<UserTypes, '_id'>>({
      query: ({ _id }) => ({ url: `/users/${_id}` }),
      transformResponse: (response: { data: UserTypes }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthEndPoints;

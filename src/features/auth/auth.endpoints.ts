import type {
  UserTypes,
  AuthRegisterPayload,
  AuthLoginPayload,
  AuthStateType,
  ResponseObj,
} from '../../types';
import { ApiSlice } from '../../app/services/api.service';

const AUTH_URL = '/users';

export const AuthEndPoints = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthStateType & ResponseObj, AuthRegisterPayload>({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthStateType & ResponseObj, AuthLoginPayload>({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        body: data,
      }),
    }),
    getCurrentUser: builder.query<UserTypes, Pick<UserTypes, '_id'>>({
      query: ({ _id }) => ({ url: ` users/${_id}` }),
      transformResponse: (response: { data: UserTypes }) => response.data,
      transformErrorResponse: (response: { status: string | number }) => response.status,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthEndPoints;

import { ApiService } from "../../app/services/api.service";

interface RegisterRequest {
  [key: string]: any;
}

interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const AuthSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<Response, RegisterRequest>({
      query: (data) => {
        return {
          url: "/users/register",
          method: "POST",
          body: data,
        };
      },
    }),

    createPassword: builder.mutation<Response, { password: string; email: string }>({
      query: ({ password, email }) => ({
        url: "/users/register/set-password",
        method: "POST",
        body: { password, email },
      }),
    }),

    login: builder.mutation<Response, LoginRequest>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<Response, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation<Response, { email: string }>({
      query: ({ email }) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    verifyEmail: builder.mutation<Response, { token: string; email: string }>({
      query: ({ token, email }) => ({
        url: "/users/verify-email",
        method: "POST",
        body: { token, email },
      }),
    }),

    resendEmailForNewUser: builder.mutation<Response, { email: string }>({
      query: ({ email }) => ({
        url: "/users/new/resend-email-verification",
        method: "POST",
        body: { email },
      }),
    }),

    resendEmailForExistingUser: builder.mutation<Response, void>({
      query: () => ({
        url: "/users/resend-email-verification",
        method: "POST",
      }),
    }),

    resetForgotPassword: builder.mutation<Response, { token: string; password: string }>({
      query: ({ token, password }) => ({
        url: "/users/reset-password",
        method: "POST",
        body: { token, password },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useResetForgotPasswordMutation,
  useCreatePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResendEmailForNewUserMutation,
  useResendEmailForExistingUserMutation,
} = AuthSlice;

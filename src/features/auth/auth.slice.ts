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
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        return {
          url: "/users/register",
          method: "POST",
          body: formData,
        };
      },
    }),

    createPassword: builder.mutation<Response, { password: string }>({
      query: (password) => ({
        url: "/users/register/set-password",
        method: "POST",
        body: { password },
      }),
    }),

    login: builder.mutation<Response, LoginRequest>({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    adminLogin: builder.mutation<Response, LoginRequest>({
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
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    verifyEmail: builder.mutation<Response, { token: string; email: string }>({
      query: ({ token, email }) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: { token, email },
      }),
    }),

    adminLogout: builder.mutation<Response, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useAdminLoginMutation,
  useCreatePasswordMutation,
  useAdminLogoutMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} = AuthSlice;

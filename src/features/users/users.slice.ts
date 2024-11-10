import { ApiService } from "../../app/services/api.service";
import { User } from "../../types/redux/auth";

interface Response {
  data: User | User[] | any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface UserRequest {
  [key: string]: any;
}

export const UsersSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<Response, UserRequest>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),

    getAllUsers: builder.query<Response, void>({
      query: () => "/users",
      providesTags: (result) =>
        result?.data?.users?.length
          ? [
              ...result?.data.users.map((user: User) => ({
                type: "User" as const,
                id: user._id,
              })),
              { type: "User", id: "USER" },
            ]
          : [{ type: "User", id: "USER" }],
    }),

    getVerifiedUsers: builder.query<Response, void>({
      query: () => "/users/verified-users",
      providesTags: (result) =>
        result?.data?.users?.length
          ? [
              ...result?.data.users.map((user: User) => ({
                type: "User" as const,
                id: user._id,
              })),
              { type: "User", id: "USER" },
            ]
          : [{ type: "User", id: "USER" }],
    }),

    deleteUser: builder.mutation<Response, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUsersQuery, useDeleteUserMutation } = UsersSlice;

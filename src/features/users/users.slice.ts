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

interface UserQuery {
  [key: string]: any | undefined;
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

    getAllUsers: builder.query<Response, UserQuery>({
      query: ({ limit = 10, page = 1 }) => `/users?limit=${limit}&page=${page}`,
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

    getVerifiedUsers: builder.query<Response, UserQuery>({
      query: ({ limit = 10, page = 1 }) => `/users/verified-users?limit=${limit}&page=${page}`,
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

    assignUserRole: builder.mutation<Response, Pick<User, "_id" | "role">>({
      query: ({ _id, role }) => ({
        url: `/users/assign-role/${_id}`,
        method: "POST",
        body: role,
      }),
    }),

    updateUser: builder.mutation<Response, Pick<User, "_id"> & Partial<UserRequest>>({
      query: ({ _id, ...patch }) => ({
        url: `/users/${_id}`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: (_, __, { _id }) => [{ type: "User", id: _id }],
    }),

    getCurrentUser: builder.query<Response, string>({
      query: (userId) => `/users/currrnt-user/${userId}`,
      providesTags: (_, __, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useAssignUserRoleMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = UsersSlice;

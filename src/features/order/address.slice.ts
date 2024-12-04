import { AddressInterface } from "./../../types/redux/order";
import { ApiService } from "../../app/services/api.service";

interface AddressQuery {
  [key: string]: any | undefined;
}

interface AddressRequest {
  [key: string]: any | undefined;
}

interface Response {
  data: AddressInterface | AddressInterface[] | any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const AddressSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation<Response, AddressRequest>({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
    }),

    getAddressById: builder.query<Response, string>({
      query: (addressId) => `/addresses/${addressId}`,
      providesTags: (_, __, addressId) => [{ id: addressId, type: "Address" }],
    }),

    getUserAddress: builder.query<Response, void>({
      query: () => `/addresses/current-user`,
    }),

    getAllAddress: builder.query<Response, AddressQuery>({
      query: ({ limit = 10, page = 1 }) => `/addresses?limit=${limit}&page=${page}`,
      providesTags: (result) =>
        result?.data?.addresses?.length
          ? [
              ...result?.data?.addresses.map((a: AddressInterface) => ({
                type: "Address",
                id: a._id,
              })),
              { type: "Address", id: "ADDRESS" },
            ]
          : [{ type: "Address", id: "ADDRESS" }],
    }),

    updateAddress: builder.mutation<
      Response,
      Pick<AddressInterface, "_id"> & Partial<AddressInterface>
    >({
      query: ({ _id, ...patch }) => ({
        url: `/addresses`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_, __, { _id }) => [{ type: "Address", id: _id }],
    }),

    deleteAddress: builder.mutation<Response, string>({
      query: (addressId) => ({
        url: `/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, addressId) => [{ type: "Address", id: addressId }],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAllAddressQuery,
  useUpdateAddressMutation,
  useGetAddressByIdQuery,
  useGetUserAddressQuery,
  useDeleteAddressMutation,
} = AddressSlice;

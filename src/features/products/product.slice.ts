import { ApiService } from "../../app/services/api.service";
import { ProductType } from "../../types/redux/product";

interface ProductRequest {
  [key: string]: any;
}

interface ProductQuery {
  [key: string]: any | undefined;
}

interface Response {
  data: ProductType | ProductType[] | any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const ProductSlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<Response, ProductRequest>({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),

    getAllProducts: builder.query<Response, ProductQuery>({
      query: ({ limit = 10, featured = true, page = 1, name }) =>
        `products?limit=${limit}&featured=${featured}&page=${page}&name=${name}`,
      providesTags: (result) =>
        result?.data.products
          ? [
              ...result?.data.products.map((p: ProductType) => ({
                type: "Product" as const,
                id: p._id,
              })),
              { type: "Product", id: "PRODUCT" },
            ]
          : [{ type: "Product", id: "PRODUCT" }],
    }),

    updateProduct: builder.mutation<
      Response,
      Pick<ProductRequest, "_id"> & Partial<ProductRequest>
    >({
      query: (_id, ...patch) => ({
        url: `/products/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_, __, { _id }) => [{ type: "Product", id: _id }],
    }),

    getProductById: builder.query<Response, string>({
      query: (productId) => `/products/${productId}`,
      providesTags: (_, __, productId) => [{ type: "Product", id: productId }],
    }),

    getProductsByCategory: builder.query<Response, ProductQuery>({
      query: ({ categoryId, page, limit }) =>
        `/products/category/${categoryId}?page=${page}&limit=${limit}`,
      providesTags: (_, __, { _id }) => [{ type: "Product", id: _id }],
    }),

    deleteProduct: builder.mutation<Response, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, productId) => [{ type: "Product", id: productId }],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useDeleteProductMutation,
} = ProductSlice;

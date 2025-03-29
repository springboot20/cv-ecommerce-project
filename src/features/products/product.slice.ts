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
      query: (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          if (key === "imageSrc" && data[key]) {
            formData.append(key, data[key]);
          } else if (Array.isArray(data[key]) || typeof data[key] === "object") {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        });

        return {
          url: "/products",
          method: "POST",
          body: formData,
        };
      },
    }),

    getAllProducts: builder.query<Response, ProductQuery>({
      query: ({ limit = 10, page = 1, featured, name, sizes = "", colors = "" }) =>
        `products?limit=${limit}&page=${page}&featured=${featured}&name=${name}&colors=${colors}&sizes=${sizes}`,
      providesTags: (result) =>
        result?.data?.products?.length
          ? [
              // eslint-disable-next-line no-unsafe-optional-chaining
              ...result?.data.products.map((p: ProductType) => ({
                type: "Product" as const,
                id: p._id,
              })),
              { type: "Product", id: "PRODUCT" },
            ]
          : [{ type: "Product", id: "PRODUCT" }],
    }),

    updateProduct: builder.mutation<Response, ProductRequest>({
      query: ({ _id, ...patch }) => {
        const formData = new FormData();

        Object.keys(patch).forEach((key) => {
          formData.append(key, patch[key]);
        });

        return {
          url: `/products/${_id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (_, __, { _id }) => [{ type: "Product", id: _id }],
    }),

    getProductById: builder.query<Response, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_, __, id) => [{ type: "Product", id }],
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

import { ProductCategory } from "./../../types/redux/product";
import { ApiService } from "../../app/services/api.service";

// interface ProductQuery {
//   [key: string]: any | undefined;
// }

interface Response {
  data: ProductCategory[] | any;
  statusCode: number;
  message: string;
  success: boolean;
}

export const CategorySlice = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation<Response, { name: string }>({
      query: ({ name }) => ({
        url: "/categories",
        method: "POST",
        body: name,
      }),
    }),

    getAllCategory: builder.query<Response, void>({
      query: () => "/categories",
      providesTags: (result) =>
        result?.data?.categorie?.length
          ? [
              ...result?.data?.categorie.map((c: ProductCategory) => ({
                type: "Category",
                id: c._id,
              })),
              { type: "Category", id: "CATEGORY" },
            ]
          : [{ type: "Category", id: "CATEGORY" }],
    }),
  }),
});

export const { useAddCategoryMutation, useGetAllCategoryQuery } = CategorySlice;

import { ApiService } from "../../app/services/api.service";
import { Rating } from "../../types/redux/product";
interface Response {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

interface RatingRequest {
  [key: string]: any;
}

interface RatingQuery {
  [key: string]: any | undefined;
}

export const ratingApi = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    // Get all ratings for a product
    getProductRatings: builder.query<Response, RatingQuery>({
      query: ({ productId, page = 1, limit = 10, sort = "newest", verified = "all" }) => ({
        url: `/products/ratings/${productId}`,
        params: { page, limit, sort, verified },
      }),
      providesTags: (result, _, { productId }) =>
        result
          ? [
              { type: "Rating", id: "LIST" },
              ...result.data.ratings.map(({ _id }: Rating) => ({ type: "Rating", id: _id })),
              { type: "Rating", id: `PRODUCT_${productId}` },
            ]
          : [
              { type: "Rating", id: "LIST" },
              { type: "Rating", id: `PRODUCT_${productId}` },
            ],
    }),

    // Get user's rating for a specific product
    getUserProductRating: builder.query<Response, string>({
      query: (productId) => ({
        url: `/products/ratings/user-rating/${productId}`,
      }),
      providesTags: (_, __, productId) => [{ type: "Rating", id: `USER_PRODUCT_${productId}` }],
    }),

    // Add rating without comment
    rateProduct: builder.mutation<Response, RatingRequest>({
      query: ({ productId, rating }) => ({
        url: `/products/ratings/rate-without-comment`,
        method: "POST",
        body: { rating, productId },
      }),
      invalidatesTags: (_, ___, { productId }) => [
        { type: "Rating", id: "LIST" },
        { type: "Rating", id: `PRODUCT_${productId}` },
        { type: "Rating", id: `USER_PRODUCT_${productId}` },
        { type: "Product", id: productId },
      ],
    }),

    // Add rating with comment
    rateProductWithComment: builder.mutation<Response, RatingRequest>({
      query: ({ productId, rating, comment }) => ({
        url: `/products/ratings/rate-with-comment`,
        method: "POST",
        body: { rating, comment, productId },
      }),
      invalidatesTags: (_, __, { productId }) => [
        { type: "Rating", id: "LIST" },
        { type: "Rating", id: `PRODUCT_${productId}` },
        { type: "Rating", id: `USER_PRODUCT_${productId}` },
        { type: "Product", id: productId },
      ],
    }),

    // Delete a rating
    deleteRating: builder.mutation<Response, string>({
      query: (ratingId) => ({
        url: `/products/ratings/${ratingId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, ratingId) => [
        { type: "Rating", id: "LIST" },
        { type: "Rating", id: ratingId },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductRatingsQuery,
  useGetUserProductRatingQuery,
  useRateProductMutation,
  useRateProductWithCommentMutation,
  useDeleteRatingMutation,
} = ratingApi;

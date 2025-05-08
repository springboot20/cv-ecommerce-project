import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import classNames from "classnames";
import {
  useGetProductRatingsQuery,
  useRateProductMutation,
  useRateProductWithCommentMutation,
  useDeleteRatingMutation,
} from "../../features/ratings/rate.slice";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { Rating } from "../../types/redux/product";

const ProductRatings = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState("");

  const { user } = useAppSelector((state: RootState) => state.auth);

  // Fetch product ratings
  const { data, isLoading, refetch } = useGetProductRatingsQuery({
    productId: id,
    page,
    limit: 5,
    sort: sortBy,
    verified: activeTab === "all" ? "all" : activeTab === "verified" ? "verified" : "unverified",
  });

  // Rating mutations
  const [rateProduct, { isLoading: isRating }] = useRateProductMutation();
  const [rateProductWithComment, { isLoading: isRatingWithComment }] =
    useRateProductWithCommentMutation();
  const [deleteRating, { isLoading: isDeleting }] = useDeleteRatingMutation();

  const ratingsData = data?.data?.ratings as Rating[];

  // Get user's existing rating for this product
  useEffect(() => {
    if (data && user) {
      const userExistingRating = ratingsData.find((rating) =>
        typeof rating.userId === "string" ? rating.userId : rating.userId?._id === user._id
      );

      if (userExistingRating) {
        setUserRating(userExistingRating?.rate);
        setComment(userExistingRating?.comment || "");
      }
    }
  }, [ratingsData, user]);

  const handleRatingSubmit = async () => {
    if (!user) {
      toast.error("Please login to rate this product");
      return;
    }

    try {
      if (showCommentForm && comment.trim()) {
        await rateProductWithComment({
          productId: id,
          rating: userRating,
          comment,
        }).unwrap();
        toast.success("Thank you for your rating and review!");
      } else {
        await rateProduct({
          productId: IDBIndex,
          rating: userRating,
        }).unwrap();
        toast.success("Thank you for your rating!");
      }

      setShowCommentForm(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit rating");
    }
  };

  const handleDeleteRating = async (ratingId: string) => {
    try {
      await deleteRating(ratingId).unwrap();
      toast.success("Rating deleted successfully");
      setUserRating(0);
      setComment("");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete rating");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // If no ratings data is available yet
  if (isLoading) {
    return (
      <div className="animate-pulse p-4">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  const { ratings = [], summary = {}, pagination = {} } = data?.data || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 pb-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-gray-800">
            {summary.averageRating?.toFixed(1) || "0.0"}
          </div>
          <div className="flex items-center my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarSolid
                key={star}
                className={classNames(
                  "w-5 h-5",
                  star <= Math.round(summary.averageRating) ? "text-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">{summary.totalRatings || 0} ratings</div>
        </div>

        <div className="flex-1">
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = summary.distribution?.[star] || 0;
              const percentage = summary.totalRatings
                ? Math.round((count / summary.totalRatings) * 100)
                : 0;

              return (
                <div key={star} className="flex items-center text-sm">
                  <span className="w-12">{star} star</span>
                  <div className="flex-1 mx-3 h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-10 text-right text-gray-500">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Rating Section */}
        {user && (
          <div className="md:w-64 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Rate this product</h3>
            <div className="flex items-center mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                  className="mr-1 focus:outline-none"
                >
                  {(hoverRating || userRating) >= star ? (
                    <StarSolid className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <StarOutline className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              ))}
            </div>

            {userRating > 0 && (
              <>
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="text-indigo-600 text-sm hover:text-indigo-800 mb-3"
                >
                  {showCommentForm ? "Hide comment form" : "Add a comment"}
                </button>

                {showCommentForm && (
                  <div className="mb-3">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      rows={3}
                      placeholder="Share your thoughts about this product..."
                    ></textarea>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleRatingSubmit}
                    disabled={isRating || isRatingWithComment}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isRating || isRatingWithComment ? "Submitting..." : "Submit"}
                  </button>

                  {userRating > 0 && (
                    <button
                      onClick={() => setUserRating(0)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Filter and Sort */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex gap-4 mb-2 md:mb-0">
          <button
            onClick={() => setActiveTab("all")}
            className={classNames(
              "text-sm font-medium",
              activeTab === "all" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
            )}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveTab("verified")}
            className={classNames(
              "text-sm font-medium",
              activeTab === "verified"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500"
            )}
          >
            Verified Purchases
          </button>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      {ratings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this product!
        </div>
      ) : (
        <div className="space-y-6">
          {ratings.map((rating: Rating) => (
            <div key={rating._id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {typeof rating.userId === "object" && rating.userId?.avatar ? (
                    <img
                      src={rating.userId.avatar?.url!}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <span className="text-gray-500">
                        {(typeof rating.userId === "object" && rating.userId?.name?.charAt(0)) ||
                          "U"}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarSolid
                          key={star}
                          className={classNames(
                            "w-4 h-4",
                            star <= rating.rate ? "text-yellow-400" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-sm font-medium">
                      {(typeof rating.userId === "object" && rating.userId?.name) || "Anonymous"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(rating.createdAt).toLocaleDateString()}
                      {rating?.isVerifiedPurchase && (
                        <span className="ml-2 text-green-600">✓ Verified Purchase</span>
                      )}
                    </div>
                  </div>
                </div>

                {user && user._id === (typeof rating.userId === "object" && rating.userId?._id) && (
                  <button
                    onClick={() => handleDeleteRating(rating._id)}
                    disabled={isDeleting}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>

              {rating.comment && (
                <div className="mt-3 text-gray-800">
                  <p>{rating.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={classNames(
                "px-3 py-1 mr-1 rounded",
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              Previous
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={classNames(
                  "px-3 py-1 mx-1 rounded",
                  pageNum === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pagination.totalPages}
              className={classNames(
                "px-3 py-1 ml-1 rounded",
                page === pagination.totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductRatings;

import { useParams } from "react-router";
import { useGetOrderByIdQuery } from "../../../../features/order/order.slice";
import { useEffect, useState } from "react";
import { OrderFetched } from "../../../../types/redux/order";
import { formatDate } from "../../../../util";
import { OrderSkeletonLoad } from "../../../../components/loaders/Skeleton";
// import { formatPrice } from "../../../../helpers";
import axios from "axios";
import { useAppSelector } from "../../../../hooks/redux/redux.hooks";
import { ProductType } from "../../../../types/redux/product";

const env = import.meta.env;
let url = env.MODE === "development" ? env.VITE_API_BASE_URL_DEV : env.VITE_API_BASE_URL_PROD;

export default function OrderDetails() {
  const { orderId } = useParams();
  const { tokens } = useAppSelector((state) => state.auth);
  const { data, isLoading, refetch } = useGetOrderByIdQuery(orderId!);
  const [products, setProducts] = useState<ProductType[]>([]);

  const order: OrderFetched = data?.data?.order;

  useEffect(() => {
    refetch();

    // Extract product IDs from order items
    const productIds = order?.items
      .filter((item) => item?.productId) // Ensure productId exists
      .map((item) => item?.productId);

    // Fetch product details for each product ID
    if (productIds?.length > 0) {
      axios
        .post(
          `${url}orders/products`,
          { ids: productIds },
          {
            headers: {
              Authorization: `Bearer ${tokens?.access_token}`,
            },
          },
        ) // Replace with your API endpoint for bulk fetch
        .then((res) => {
          setProducts(res.data.products); // Assuming the response contains a products array
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [orderId, refetch]);

  console.log(products);

  return (
    <div className="px-4 xl:px-0">
      <header className="border-b-2 border-gray-300 py-2">
        <div className="space-y-1">
          <h2 className="font-medium capitalize text-xl text-gray-800">order details</h2>
          <p className="text-lg">
            <span className="font-medium text-gray-700">
              Order number <small>{order?.paymentId ?? ""}</small>
            </span>
            .<span>{formatDate(order?.createdAt ?? "2014-02-11T11:30:30")}</span>
          </p>
        </div>
      </header>
      {isLoading ? (
        <OrderSkeletonLoad />
      ) : (
        <section className="mt-4">
          {order?.items?.map((_) => {
            return (
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <div className="sm:max-w-xs w-full h-72 lg:max-w-sm lg:h-96">
                  <img src={item?.product?.imageSrc?.url} alt={item?.product?.name} />
                </div>

                <div className="w-full h-max  grid grid-cols-1 sm:grid-cols-2">
                  <div className="mt-4 col-span-full">
                    <h3>{item?.product?.name}</h3>
                    <h5>{formatPrice(item?.product?.price)}</h5>
                    <div className="mt-2">
                      <p>{item?.product?.description}</p>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

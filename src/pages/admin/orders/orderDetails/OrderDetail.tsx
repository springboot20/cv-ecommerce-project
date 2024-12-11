import { useParams } from "react-router";
import { useGetUserOrderByIdQuery } from "../../../../features/order/order.slice";
import { useEffect } from "react";
import { OrderFetched } from "../../../../types/redux/order";
import { formatDate } from "../../../../util";
import { OrderSkeletonLoad } from "../../../../components/loaders/Skeleton";

export default function OrderDetails() {
  const { orderId } = useParams();

  const { data, isLoading, refetch } = useGetUserOrderByIdQuery(orderId!);

  const order: OrderFetched = data?.data?.order;

  console.log(data);
  console.log(isLoading);

  useEffect(() => {
    refetch();
  }, [orderId, refetch]);

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

      <OrderSkeletonLoad />
    </div>
  );
}

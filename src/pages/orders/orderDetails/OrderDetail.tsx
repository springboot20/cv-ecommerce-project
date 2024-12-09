import { useParams } from "react-router";
import { useGetUserOrderByIdQuery } from "../../../features/order/order.slice";
import { useEffect } from "react";
import { OrderFetched } from "../../../types/redux/order";
import { formatDate } from "../../../util";

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
    <div>
      <header>
        <div className="space-y-1">
          <h2>order details</h2>
          <p>
            <span className="font-medium text-gray-700">
              Order number <small>{order?.paymentId}</small>
            </span>
            .<span>{formatDate(order?.createdAt)} </span>
          </p>
        </div>
      </header>
    </div>
  );
}

import { useParams } from "react-router";
import { useGetUserOrderByIdQuery } from "../../../features/order/order.slice";
import { useEffect } from "react";

export default function OrderDetails() {
  const { orderId } = useParams();

  const { data, isLoading, refetch } = useGetUserOrderByIdQuery(orderId!);

  console.log(data);
  console.log(isLoading);

  useEffect(() => {
    refetch();
  }, [orderId, refetch]);

  return <div>OrderDetails</div>;
}

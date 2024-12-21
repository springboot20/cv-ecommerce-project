import { Fragment, useEffect, useState } from "react";
import { useGetUserOrdersQuery } from "../../features/order/order.slice";
import { Orders } from "../../types/redux/order";
import OrderTable from "../../components/table/OrderTable";
import { CardFooter, Typography, Button } from "@material-tailwind/react";
import VerifyPaystackPayment from "./verify/VerifyPayment";
import StatusSwitch from "../../components/switch/Switch";

const OrderHeader: React.FC<{
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setCanClickOrder: React.Dispatch<React.SetStateAction<boolean>>;
  canClickOrder: boolean;
}> = ({ setStatus, status, setCanClickOrder, canClickOrder }) => {
  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <fieldset>
        <label htmlFor="status" className="text-lg font-normal text-gray-700 capitalize mr-4">
          filter status
        </label>
        <select
          value={status}
          className="py-1.5 px-3 rounded max-w-xs w-full"
          onChange={(evt) => setStatus(evt.target.value)}
        >
          <option>filter by status</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>
      </fieldset>

      <div className="flex items-center gap-2">
        <span className="text-lg font-medium text-gray-700">Toggle order click: </span>
        <StatusSwitch enabled={canClickOrder} bgClass="bg-gray-700" setEnabled={setCanClickOrder} />
      </div>
    </div>
  );
};

export default function OrderLists() {
  let limit = 10;
  const [canClickOrder, setCanClickOrder] = useState(false); // State to allow clicking on orders
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("");
  const {
    data: ordersData,
    refetch,
    isLoading,
  } = useGetUserOrdersQuery({
    page,
    limit,
    status,
  });

  const orders: Orders[] = Array.isArray(ordersData?.data?.orders)
    ? ordersData?.data?.orders
    : [ordersData?.data?.orders];

  const columns = ["id", "customer name", "customer email", "order price", "ordered at", "status"];

  console.log(ordersData);

  const totalPages = ordersData?.data?.totalPages ?? 1;
  const hasNextPage = ordersData?.data?.hasNextPage ?? false;

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  console.log(status);

  useEffect(() => {
    refetch();
  }, [page, status, limit, totalPages]);

  return (
    <Fragment>
      <VerifyPaystackPayment />
      <div className="mt-5">
        <OrderTable
          columns={columns}
          data={orders}
          Header={
            <OrderHeader
              status={status}
              setStatus={setStatus}
              canClickOrder={canClickOrder}
              setCanClickOrder={setCanClickOrder}
            />
          }
          enableHeader={true}
          canClickOrder={canClickOrder}
          loading={isLoading}
        >
          <CardFooter
            className="flex items-center justify-between border-t border-blue-gray-50 p-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Page {page} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="rounded"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={handleNextPage}
                disabled={!hasNextPage}
                className="rounded"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </OrderTable>
      </div>
    </Fragment>
  );
}

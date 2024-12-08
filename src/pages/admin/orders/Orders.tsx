import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../../features/order/order.slice";
import { Orders } from "../../../types/redux/order";
import OrderTable from "../../../components/table/OrderTable";
import { CardFooter, Typography, Button } from "@material-tailwind/react";

const OrderHeader: React.FC<{
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
}> = ({ setStatus, status }) => {
  return (
    <div className="mb-3">
      <label htmlFor="status" className="tetx-base font-normal text-gray-700 capitalize mr-4">
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
    </div>
  );
};

export default function OrderLists() {
  let limit = 10;

  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("");
  const {
    data: ordersData,
    refetch,
    isLoading,
  } = useGetAllOrdersQuery({
    page,
    limit,
    status,
  });

  const orders: Orders[] = Array.isArray(ordersData?.data?.orders)
    ? ordersData?.data?.orders
    : [ordersData?.data?.orders];

  const columns = ["id", "customer name", "customer email", "order price", "ordered at", "status"];

  const totalPages = ordersData?.data?.totalPages ?? 1;
  const hasNextPage = ordersData?.data?.hasNextPage ?? false;
  const hasPrevPage = ordersData?.data?.hasPrevPage ?? false;

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevPage) {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <OrderTable
      columns={columns}
      data={orders}
      Header={<OrderHeader status={status} setStatus={setStatus} />}
      enableHeader={true}
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
            disabled={page < 1}
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
  );
}

import { Fragment } from "react/jsx-runtime";
import OrderCountsChart from "./orders/AreaOverview";
import { PieOverview } from "./orders/PieOverview";
import { useGetAllStatsQuery } from "../../../features/statistics/statistics.slice";
import { useEffect } from "react";
import { LocalStorage } from "../../../util";
import { AllStatsInterface, Orders } from "../../../types/redux/order";
import { formatPrice } from "../../../helpers";
import { Link } from "react-router-dom";
import { ProductStatisticsCardLoader } from "../../../components/loaders/Skeleton";
import OrderTable from "../../../components/table/OrderTable";
import { useGetAllOrdersQuery } from "../../../features/order/order.slice";

export default function Overview() {
  const { data, refetch, isLoading } = useGetAllStatsQuery();
  const {
    data: ordersData,
    refetch: orderRefecth,
    isLoading: orderLoading,
  } = useGetAllOrdersQuery({
    page: 1,
    limit: 10,
  });

  const statistics = data?.data?.statistics ?? (LocalStorage.get("all-stats") as AllStatsInterface);
  const orders: Orders[] = Array.isArray(ordersData?.data?.orders)
    ? ordersData?.data?.orders
    : [ordersData?.data?.orders];

  const columns = ["id", "customer name", "customer email", "order price", "ordered at", "status"];

  useEffect(() => {
    refetch();
    orderRefecth();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <ProductStatisticsCardLoader cardsNumber={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-3 xl:gap-5 xl:grid-cols-4 mt-4">
          <div className="border border-[#ECEEF6] bg-white p-4 rounded drop-shadow-[#DCE0F980]">
            <div className="flex flex-col space-y-7">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-700 font-normal capitalize text-base">TOTAL SALES</h2>
                <Link to="" className="font-medium text-sm text-[#2F66EE] capitalize underline">
                  details
                </Link>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="">
                  <strong className="text-gray-800 font-semibold capitalize text-xl sm:text-2xl">
                    {formatPrice(statistics?.product?.totalSales)}
                  </strong>
                </div>

                <span className="flex justify-center items-center rounded-full bg-[#F1F4F9] text-[#6B7280] text-xs font-semibold px-2 py-1 size-12">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.4 17.42H10.89C9.25 17.42 7.92 16.04 7.92 14.34C7.92 13.93 8.26 13.59 8.67 13.59C9.08 13.59 9.42 13.93 9.42 14.34C9.42 15.21 10.08 15.92 10.89 15.92H13.4C14.05 15.92 14.59 15.34 14.59 14.64C14.59 13.77 14.28 13.6 13.77 13.42L9.74 12C8.96 11.73 7.91 11.15 7.91 9.36C7.91 7.82 9.12 6.58 10.6 6.58H13.11C14.75 6.58 16.08 7.96 16.08 9.66C16.08 10.07 15.74 10.41 15.33 10.41C14.92 10.41 14.58 10.07 14.58 9.66C14.58 8.79 13.92 8.08 13.11 8.08H10.6C9.95 8.08 9.41 8.66 9.41 9.36C9.41 10.23 9.72 10.4 10.23 10.58L14.26 12C15.04 12.27 16.09 12.85 16.09 14.64C16.08 16.17 14.88 17.42 13.4 17.42Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                      fill="#2F66EE"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#ECEEF6] bg-white p-4 rounded drop-shadow-[#DCE0F980]">
            <div className="flex flex-col space-y-7">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-700 font-normal capitalize text-base">TOTAL PRODUCTS</h2>
                <Link
                  to="/admin/products/all"
                  className="font-medium text-sm text-[#2F66EE] capitalize underline"
                >
                  details
                </Link>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="">
                  <strong className="text-gray-800 font-semibold capitalize text-xl sm:text-2xl">
                    {statistics?.totalProducts}
                  </strong>
                </div>

                <span className="flex justify-center items-center rounded-full bg-[#F1F4F9] text-[#6B7280] text-xs font-semibold px-2 py-1 size-12">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.19 17.75H7.53999C6.54999 17.75 5.59999 17.33 4.92999 16.6C4.25999 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.74999 3.33001 4.53999 3.10001C4.32999 2.87001 4.04 2.75 3.73 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H3.74001C4.47001 1.25 5.15999 1.56 5.64999 2.09C5.91999 2.39 6.12 2.74 6.23 3.13H18.72C19.73 3.13 20.66 3.53 21.34 4.25C22.01 4.98 22.35 5.93 22.27 6.94L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75ZM6.28 4.62L5.5 14.02C5.45 14.6 5.64 15.15 6.03 15.58C6.42 16.01 6.95999 16.24 7.53999 16.24H18.19C19.23 16.24 20.17 15.36 20.25 14.32L20.79 6.82001C20.83 6.23001 20.64 5.67001 20.25 5.26001C19.86 4.84001 19.32 4.60999 18.73 4.60999H6.28V4.62Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M16.25 22.75C15.15 22.75 14.25 21.85 14.25 20.75C14.25 19.65 15.15 18.75 16.25 18.75C17.35 18.75 18.25 19.65 18.25 20.75C18.25 21.85 17.35 22.75 16.25 22.75ZM16.25 20.25C15.97 20.25 15.75 20.47 15.75 20.75C15.75 21.03 15.97 21.25 16.25 21.25C16.53 21.25 16.75 21.03 16.75 20.75C16.75 20.47 16.53 20.25 16.25 20.25Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M8.25 22.75C7.15 22.75 6.25 21.85 6.25 20.75C6.25 19.65 7.15 18.75 8.25 18.75C9.35 18.75 10.25 19.65 10.25 20.75C10.25 21.85 9.35 22.75 8.25 22.75ZM8.25 20.25C7.97 20.25 7.75 20.47 7.75 20.75C7.75 21.03 7.97 21.25 8.25 21.25C8.53 21.25 8.75 21.03 8.75 20.75C8.75 20.47 8.53 20.25 8.25 20.25Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M21 8.75H9C8.59 8.75 8.25 8.41 8.25 8C8.25 7.59 8.59 7.25 9 7.25H21C21.41 7.25 21.75 7.59 21.75 8C21.75 8.41 21.41 8.75 21 8.75Z"
                      fill="#2F66EE"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#ECEEF6] bg-white p-4 rounded drop-shadow-[#DCE0F980]">
            <div className="flex flex-col space-y-7">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-700 font-normal capitalize text-base">TOTAL USERS</h2>
                <Link
                  to="/admin/users"
                  className="font-medium text-sm text-[#2F66EE] capitalize underline"
                >
                  details
                </Link>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="">
                  <strong className="text-gray-800 font-semibold capitalize text-xl sm:text-2xl">
                    {statistics?.customers}
                  </strong>
                </div>

                <span className="flex justify-center items-center rounded-full bg-[#F1F4F9] text-[#6B7280] text-xs font-semibold px-2 py-1 size-12">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.15957 11.62C9.12957 11.62 9.10957 11.62 9.07957 11.62C9.02957 11.61 8.95957 11.61 8.89957 11.62C5.99957 11.53 3.80957 9.25 3.80957 6.44C3.80957 3.58 6.13957 1.25 8.99957 1.25C11.8596 1.25 14.1896 3.58 14.1896 6.44C14.1796 9.25 11.9796 11.53 9.18957 11.62C9.17957 11.62 9.16957 11.62 9.15957 11.62ZM8.99957 2.75C6.96957 2.75 5.30957 4.41 5.30957 6.44C5.30957 8.44 6.86957 10.05 8.85957 10.12C8.91957 10.11 9.04957 10.11 9.17957 10.12C11.1396 10.03 12.6796 8.42 12.6896 6.44C12.6896 4.41 11.0296 2.75 8.99957 2.75Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M16.5396 11.75C16.5096 11.75 16.4796 11.75 16.4496 11.74C16.0396 11.78 15.6196 11.49 15.5796 11.08C15.5396 10.67 15.7896 10.3 16.1996 10.25C16.3196 10.24 16.4496 10.24 16.5596 10.24C18.0196 10.16 19.1596 8.96 19.1596 7.49C19.1596 5.97 17.9296 4.74 16.4096 4.74C15.9996 4.75 15.6596 4.41 15.6596 4C15.6596 3.59 15.9996 3.25 16.4096 3.25C18.7496 3.25 20.6596 5.16 20.6596 7.5C20.6596 9.8 18.8596 11.66 16.5696 11.75C16.5596 11.75 16.5496 11.75 16.5396 11.75Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M9.16961 22.55C7.20961 22.55 5.23961 22.05 3.74961 21.05C2.35961 20.13 1.59961 18.87 1.59961 17.5C1.59961 16.13 2.35961 14.86 3.74961 13.93C6.74961 11.94 11.6096 11.94 14.5896 13.93C15.9696 14.85 16.7396 16.11 16.7396 17.48C16.7396 18.85 15.9796 20.12 14.5896 21.05C13.0896 22.05 11.1296 22.55 9.16961 22.55ZM4.57961 15.19C3.61961 15.83 3.09961 16.65 3.09961 17.51C3.09961 18.36 3.62961 19.18 4.57961 19.81C7.06961 21.48 11.2696 21.48 13.7596 19.81C14.7196 19.17 15.2396 18.35 15.2396 17.49C15.2396 16.64 14.7096 15.82 13.7596 15.19C11.2696 13.53 7.06961 13.53 4.57961 15.19Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M18.3396 20.75C17.9896 20.75 17.6796 20.51 17.6096 20.15C17.5296 19.74 17.7896 19.35 18.1896 19.26C18.8196 19.13 19.3996 18.88 19.8496 18.53C20.4196 18.1 20.7296 17.56 20.7296 16.99C20.7296 16.42 20.4196 15.88 19.8596 15.46C19.4196 15.12 18.8696 14.88 18.2196 14.73C17.8196 14.64 17.5596 14.24 17.6496 13.83C17.7396 13.43 18.1396 13.17 18.5496 13.26C19.4096 13.45 20.1596 13.79 20.7696 14.26C21.6996 14.96 22.2296 15.95 22.2296 16.99C22.2296 18.03 21.6896 19.02 20.7596 19.73C20.1396 20.21 19.3596 20.56 18.4996 20.73C18.4396 20.75 18.3896 20.75 18.3396 20.75Z"
                      fill="#2F66EE"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#ECEEF6] bg-white p-4 rounded drop-shadow-[#DCE0F980]">
            <div className="flex flex-col space-y-7">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-700 font-normal capitalize text-base">TOTAL ORDERS</h2>
                <Link
                  to="/admin/orders"
                  className="font-medium text-sm text-[#2F66EE] capitalize underline"
                >
                  details
                </Link>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="">
                  <strong className="text-gray-800 font-semibold capitalize text-xl sm:text-2xl">
                    {statistics?.totalOrders}
                  </strong>
                </div>

                <span className="flex justify-center items-center rounded-full bg-[#F1F4F9] text-[#6B7280] text-xs font-semibold px-2 py-1 size-12">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.19 17.75H7.53999C6.54999 17.75 5.59999 17.33 4.92999 16.6C4.25999 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.74999 3.33001 4.53999 3.10001C4.32999 2.87001 4.04 2.75 3.73 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H3.74001C4.47001 1.25 5.15999 1.56 5.64999 2.09C5.91999 2.39 6.12 2.74 6.23 3.13H18.72C19.73 3.13 20.66 3.53 21.34 4.25C22.01 4.98 22.35 5.93 22.27 6.94L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75ZM6.28 4.62L5.5 14.02C5.45 14.6 5.64 15.15 6.03 15.58C6.42 16.01 6.95999 16.24 7.53999 16.24H18.19C19.23 16.24 20.17 15.36 20.25 14.32L20.79 6.82001C20.83 6.23001 20.64 5.67001 20.25 5.26001C19.86 4.84001 19.32 4.60999 18.73 4.60999H6.28V4.62Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M16.25 22.75C15.15 22.75 14.25 21.85 14.25 20.75C14.25 19.65 15.15 18.75 16.25 18.75C17.35 18.75 18.25 19.65 18.25 20.75C18.25 21.85 17.35 22.75 16.25 22.75ZM16.25 20.25C15.97 20.25 15.75 20.47 15.75 20.75C15.75 21.03 15.97 21.25 16.25 21.25C16.53 21.25 16.75 21.03 16.75 20.75C16.75 20.47 16.53 20.25 16.25 20.25Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M8.25 22.75C7.15 22.75 6.25 21.85 6.25 20.75C6.25 19.65 7.15 18.75 8.25 18.75C9.35 18.75 10.25 19.65 10.25 20.75C10.25 21.85 9.35 22.75 8.25 22.75ZM8.25 20.25C7.97 20.25 7.75 20.47 7.75 20.75C7.75 21.03 7.97 21.25 8.25 21.25C8.53 21.25 8.75 21.03 8.75 20.75C8.75 20.47 8.53 20.25 8.25 20.25Z"
                      fill="#2F66EE"
                    />
                    <path
                      d="M21 8.75H9C8.59 8.75 8.25 8.41 8.25 8C8.25 7.59 8.59 7.25 9 7.25H21C21.41 7.25 21.75 7.59 21.75 8C21.75 8.41 21.41 8.75 21 8.75Z"
                      fill="#2F66EE"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 col-span-1 xl:col-span-2 w-full border">
          <OrderCountsChart />
        </div>
        <div className="bg-white rounded-lg p-4 col-span-1 w-full border">
          <PieOverview />
        </div>
      </div>

      <OrderTable
        columns={columns}
        data={orders.slice(0, 6)}
        loading={orderLoading}
        enableHeader={true}
        Header={<OrderHeader />}
      />
    </Fragment>
  );
}

const OrderHeader = () => {
  return (
    <div className="flex justify-between items-center my-3">
      <h1 className="text-gray-700 font-medium text-xl capitalize">recent orders</h1>
      <Link to="/admin/orders" className="text-blue-500 hover:underline capitalize font-medium">
        show all orders
      </Link>
    </div>
  );
};

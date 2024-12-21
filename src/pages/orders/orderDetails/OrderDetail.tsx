import { useParams } from "react-router";
import { useGetOrderByIdQuery } from "../../../features/order/order.slice";
import { useEffect, Fragment } from "react";
import { OrderFetched } from "../../../types/redux/order";
import { formatDate } from "../../../util";
import { OrderSkeletonLoad } from "../../../components/loaders/Skeleton";
import { formatPrice } from "../../../helpers";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { data, isLoading, refetch } = useGetOrderByIdQuery(orderId!);

  const order: OrderFetched = data?.data?.order;
  console.log(order);

  useEffect(() => {
    refetch();
  }, [orderId, refetch]);

  let shipping = 5.0;

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
          {order?.items?.map((item) => {
            return (
              <Fragment key={item?.product?._id}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className=" w-full h-72 lg:max-w-full lg:h-96 border rounded-md overflow-hidden">
                    <img src={item?.product?.imageSrc?.url} alt={item?.product?.name} className="h-full w-full object-cover"/>
                  </div>

                  <div className="w-full h-max grid grid-cols-1 sm:grid-cols-2">
                    <div className="mt-4 col-span-full">
                      <h3 className="font-semibold text-gray-700 text-xl">{item?.product?.name}</h3>
                      <h5 className="font-medium text-lg text-gray-700">
                        {formatPrice(item?.product?.price)}
                      </h5>
                      <p className="text-lg font-normal text-gray-700">
                        {item?.product?.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-8">
                  <div className="col-span-1">
                    <h3 className="text-lg font-medium text-gray-700 capitalize">
                      billing address
                    </h3>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-base font-normal text-gray-700"></p>
                      <p className="text-base font-normal text-gray-700"></p>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <h3 className="text-lg font-medium text-gray-700 capitalize">
                      payment information
                    </h3>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-base font-normal text-gray-700"></p>
                      <p className="text-base font-normal text-gray-700"></p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <ul className="p-5 bg-white border-b">
                      <li className="pb-4 flex items-center justify-between border-b">
                        <span className="text-gray-600 text-sm font-normal capitalize">
                          subtotal
                        </span>
                        <span className="font-semibold text-sm text-gray-800">
                          {formatPrice(order?.orderPrice ?? 0)}
                        </span>
                      </li>
                      <li className="py-4 flex items-center justify-between border-b">
                        <span className="text-gray-600 text-sm font-normal capitalize">
                          shipping estimate
                        </span>
                        <span className="font-semibold text-sm text-gray-800">
                          {formatPrice(shipping)}
                        </span>
                      </li>
                      <li className="pt-4 flex items-center justify-between border-b">
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">
                          Order total
                        </h3>
                        <span className="font-semibold text-base text-gray-800">
                          {formatPrice(order?.orderPrice * shipping)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </section>
      )}
    </div>
  );
}

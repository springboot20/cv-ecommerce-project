import { Button } from "../../components/buttons/Buttons";
import Checkout from "../../components/check-out/Checkout";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { useGetUserCartQuery, useRemoveItemFromCartMutation } from "../../features/cart/cart.slice";
import { CartInterface } from "../../types/redux/cart";
import { LocalStorage } from "../../util";
import { toast } from "react-toastify";
import { formatPrice } from "../../helpers";
import { TrashIcon } from "@heroicons/react/24/outline";

const CheckOut = () => {
  return (
    <main className="mx-auto max-w-7xl px-2 md:px-4 xl:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
        <Checkout className="col-span-1 xl:col-span-2" />
        <OrderSummary />
      </div>
    </main>
  );
};

export default CheckOut;

export const OrderSummary = () => {
  const { data, refetch } = useGetUserCartQuery();
  const [removeItemToCart] = useRemoveItemFromCartMutation();
  const { isNewAddedToCart } = useAppSelector((state: RootState) => state.cart);
  const [refreshTrigered, setRefreshTrigered] = useState(false);

  const cartItems = data?.data?.cart ?? (LocalStorage.get("cart") as CartInterface);

  const handleDelete = async (productId: string) => {
    try {
      const response = await removeItemToCart(productId).unwrap();
      setRefreshTrigered(!refreshTrigered);

      if (response.message) {
        toast.success(response.message);
      }
    } catch (error: any) {
      if (error.data) {
        toast.error(error.data.message);
      }
    }
  };
  useEffect(() => {
    refetch();
  }, [refreshTrigered, isNewAddedToCart]);

  return (
    <div className="relative w-full flex-col xl:col-span-1">
      <h3 className="text-base sm:text-lg font-medium text-gray-600 capitalize">order summary</h3>
      <div className="rounded-md border w-full">
        <div className="border-b">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems?.items?.map((item: any) => (
              <li key={item?.product._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item?.product.imageSrc.url}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between  font-medium text-gray-900">
                      <h3 className="text-gray-700 font-medium capitalize text-lg">
                        {item?.product.name}
                      </h3>
                      <p className="text-lg font-medium text-gray-700">
                        {formatPrice(item?.product.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty ({item?.quantity})</p>
                    <div className="flex space-x-4 items-center">
                      <Button
                        type="button"
                        onClick={() => {
                          handleDelete(item.product?._id);
                        }}
                        className="text-red-600 hover:text-red-500"
                      >
                        <TrashIcon className="h-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-3"></div>
        </div>

        <ul className="p-5 bg-white border-b">
          <li className="pb-3 flex items-center justify-between">
            <span className="text-gray-600 text-sm font-normal capitalize">subtotal</span>
            <span className="font-semibold text-sm text-gray-800">
              {/* {formatPrice(cart.totalCart)} */}
            </span>
          </li>
          <li className="border-b py-3 flex items-center justify-between">
            <span className="text-gray-600 text-sm font-normal capitalize">shipping estimate</span>
            <span className="font-semibold text-sm text-gray-800"></span>
          </li>

          <li className="pt-3 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-800">Order total</h3>
            <span className="font-semibold text-base text-gray-800"></span>
          </li>
        </ul>

        <div className="px-5 py-4">
          <Button className="text-base font-medium text-white py-2.5 px-2 rounded bg-gray-800 hover:bg-gray-600 w-full block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
            Confirm order
          </Button>
        </div>
      </div>
    </div>
  );
};

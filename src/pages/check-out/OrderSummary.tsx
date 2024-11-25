import { Button } from "../../components/buttons/Buttons";
import { useEffect } from "react";
import { formatPrice } from "../../helpers";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PayButton from "../../components/buttons/PayStackButton";

export const OrderSummary: React.FC<{ addressId: string; email: string; isLoading: boolean }> = ({
  addressId,
  email,
  isLoading,
}) => {
  const {
    cart,
    handleCancelEdit,
    handleDelete,
    handleEditClick,
    handleUpdateQuantity,
    isEditing,
    refreshTrigered,
    refetch,
    selectedItemId,
    setQuantityInput,
    quantityInput,
    message,
  } = useCart();

  let shipping = 5.0;
  const OrderTotal = (): number => {
    return cart.totalCart * shipping;
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    refetch();
  }, [refreshTrigered]);

  return (
    <div className="relative w-full flex-col lg:col-span-1">
      <h3 className="text-base sm:text-lg font-medium text-gray-600 capitalize">order summary</h3>
      <div className="rounded-md border w-full">
        {!cart?.items.length ? (
          <>
            <p className="text-xl font-semibold text-gray-800 mb-6">
              Your cart is empty. Keep shopping to find a product!
            </p>
            <Link
              to="/collections"
              className="bg-gray-800 hover:bg-gray-600 rounded-md px-5 py-2 text-lg font-medium text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Keep Shopping
            </Link>
          </>
        ) : (
          <div className="border-b">
            <ul role="list" className="divide-y divide-gray-200">
              {cart?.items?.map((item: any) => (
                <li key={item?.product._id} className="flex py-5 px-5">
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
                      <p className="text-gray-500">Qty ({item?.quantity})</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      {selectedItemId === item.product?._id && isEditing ? (
                        <div className="flex items-center space-x-4">
                          <fieldset>
                            <label htmlFor="quantity" className="sr-only">
                              quantity
                            </label>
                            <input
                              id="quantity"
                              type="number"
                              value={quantityInput}
                              onChange={(e) => setQuantityInput(parseInt(e.target.value))}
                              className="border border-gray-300 rounded-md p-1 text-sm w-14 text-center"
                            />
                          </fieldset>
                          <Button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.product?._id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            onClick={handleCancelEdit}
                            className="font-medium text-gray-500 hover:text-gray-400"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div></div>
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
                            <Button
                              type="button"
                              onClick={() => handleEditClick(item.product?._id)}
                              className="text-indigo-600 hover:text-indigo-500"
                            >
                              <PencilSquareIcon className="h-6" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="p-5 bg-white border-b">
          <li className="pb-3 flex items-center justify-between">
            <span className="text-gray-600 text-sm font-normal capitalize">subtotal</span>
            <span className="font-medium italic text-sm text-gray-800">
              {formatPrice(cart.totalCart)}
            </span>
          </li>
          <li className="border-b py-3 flex items-center justify-between">
            <span className="text-gray-600 text-sm font-normal capitalize">shipping estimate</span>
            <span className="font-medium italic text-sm text-gray-800">
              {formatPrice(shipping)}
            </span>
          </li>

          <li className="pt-3 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-800">Order total</h3>
            <span className="font-medium italic text-base text-gray-800">
              {formatPrice(OrderTotal())}
            </span>
          </li>
        </ul>

        {isLoading && (
          <div className="px-5 py-4">
            <PayButton
              requestData={{
                email,
                addressId,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

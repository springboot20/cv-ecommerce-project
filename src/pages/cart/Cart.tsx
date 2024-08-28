import { Fragment, useEffect, useState } from "react";
import cartImage from "../../assets/cart-image.jpg";
import { Link } from "react-router-dom";
import Button from "../../components/icon/Button";
import { formatPrice } from "../../helpers/index";
import {
  useAddItemToCartMutation,
  useGetUserCartQuery,
  useRemoveItemFromCartMutation,
} from "../../features/cart/cart.slice";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { LocalStorage } from "../../util";
import { CartInterface } from "../../types/redux/cart";
import { toast } from "react-toastify";

const Cart = () => {
  // Redux variables
  const { data, refetch } = useGetUserCartQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const [removeItemToCart] = useRemoveItemFromCartMutation();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [quantityInput, setQuantityInput] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [refreshTrigered, setRefreshTrigered] = useState(false);

  const cart: CartInterface = data?.data?.cart ?? (LocalStorage.get("cart") as CartInterface);

  const handleEditClick = (id: string) => {
    const selectedItem = cart.items.find((item: any) => {
      return item.product._id === id;
    });

    if (selectedItem) {
      if (selectedItem) {
        setQuantityInput(selectedItem.quantity); // Set initial quantity input to current quantity

        setSelectedItemId(id);
        setIsEditing(true);
      }
    }
  };

  const handleUpdateQuantity = async (productId: string) => {
    if (selectedItemId !== null && quantityInput > 0) {
      try {
        const { message } = await addItemToCart({ productId, quantity: quantityInput }).unwrap();
        if (message) {
          toast.success(message);
        }
      } catch (error: any) {
        if (error?.data.message) {
          toast.error(error?.data.message);
        }
      }

      setRefreshTrigered(!refreshTrigered);
      setSelectedItemId(null);
      setIsEditing(false);
    } else {
      console.error("Invalid quantity input.");
    }
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
    setIsEditing(false);
  };

  const handleDelete = async (productId: string) => {
    try {
      const { message } = await removeItemToCart(productId).unwrap();
      setRefreshTrigered(!refreshTrigered);

      if (message) {
        toast.success(message);
      }
    } catch (error: any) {
      if (error?.data.message) {
        toast.error(error?.data.message);
      }
    }
  };

  let shipping = 5.0;
  const OrderTotal = (): number => {
    return cart.totalCart * shipping;
  };

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
    refetch();
  }, [refreshTrigered, data?.message]);

  return (
    <Fragment>
      <div className="h-full relative px-4 py-8">
        <div>
          <h1 className="font-bold text-2xl text-gray-800 dark:text-white leading-5">
            Shopping Cart
          </h1>
        </div>
        <div className="relative flex items-stretch flex-col xl:flex-row xl:justify-between flex-shrink-0 mt-8">
          <div className="flex-shrink-0 relative left-0 right-0 flex-1 xl:right-[28rem] xl:w-[calc(100%-28rem)]">
            <div className="flex-1">
              <div className="rounded-md border bg-white border-gray-300 mb-12 p-6">
                {!cart?.items.length ? (
                  <div className="flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                      <img
                        src={cartImage}
                        alt=""
                        className="max-w-full h-auto align-middle object-contain object-center block"
                      />
                    </div>
                    <p className="text-xl font-semibold text-gray-800 mb-6">
                      Your cart is empty. Keep shopping to find a product!
                    </p>
                    <Link
                      to="/collections"
                      className="bg-gray-800 hover:bg-gray-600 rounded-md px-5 py-2 text-lg font-medium text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Keep Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cart?.items.map((item: any) => (
                        <li key={item?.product._id} className="flex py-6">
                          <div className="h-36 w-44 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.imageSrc.url}
                              alt={"product image"}
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
                              {selectedItemId === item.product._id && isEditing ? (
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
                                    onClick={() => handleUpdateQuantity(item.product._id)}
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
                                    <Button
                                      type="button"
                                      onClick={() => handleEditClick(item.product._id)}
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
              </div>
            </div>
          </div>

          <div className="relative flex-1 max-w-md w-full flex-col right-0 left-0 xl:ml-3">
            <div className="p-6 bg-white rounded-lg border w-full">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Order summary</h3>

              <ul className="mt-3">
                <li className="border-b py-3 px-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-normal capitalize">subtotal</span>
                  <span className="font-semibold text-sm text-gray-800">
                    {formatPrice(cart.totalCart)}
                  </span>
                </li>
                <li className="border-b py-3 px-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-normal capitalize">
                    shipping estimate
                  </span>
                  <span className="font-semibold text-sm text-gray-800">
                    {formatPrice(shipping)}
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">Order total</h3>
                <span className="font-semibold text-base text-gray-800">
                  {formatPrice(OrderTotal())}
                </span>
              </div>

              <div className="mt-4">
                <Button className="text-base font-semibold text-white py-2.5 px-2 rounded bg-gray-800 hover:bg-gray-600 w-full block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                  checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;

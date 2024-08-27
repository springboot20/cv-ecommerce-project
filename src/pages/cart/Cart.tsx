/** @format */

import { Fragment, useState } from "react";
import cartImage from "../assets/cart-image.jpg";
import { Link } from "react-router-dom";
import { IconType } from "../../components/icon/IconType";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/icon/Button";
import { formatPrice } from "../../helpers/index";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { useGetUserCartQuery } from "../../features/cart/cart.slice";

const Cart = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [quantityInput, setQuantityInput] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const { data, isLoading, isError } = useGetUserCartQuery();

  const handleEditClick = (id: number) => {
    const selectedItem = cartItems.find((item) => item.product.id === id);

    if (selectedItem) {
      if (selectedItem) {
        setQuantityInput(selectedItem.quantity); // Set initial quantity input to current quantity
        setSelectedItemId(id);
        setIsEditing(true);
      }
    }
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
    setIsEditing(false);
  };

  const handleUpdateQuantity = () => {
    if (selectedItemId !== null) {
      updateCartItemQuantity(selectedItemId, quantityInput); // Call updateCartItemQuantity from useCart with itemId and quantityInput
      setSelectedItemId(null);
      setIsEditing(false);
    }
  };
  const shippingFee = 1.55;
  const auth = useAppSelector((state: RootState) => state.auth.data);

  const totalItemsCost = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.price;
    const quantity = item.quantity;

    const initialTotal = itemPrice * quantity;

    return acc + initialTotal;
  }, 0);

  console.log(totalItemsCost);

  return (
    <Fragment>
      <section className="mt-[11rem] h-screen">
        <div className="mt- h-full mx-auto max-w-5xl px-4 py-8 sm:px-3 sm:py-18 md:max-w-6xl lg:max-w-[86.25rem] xl:max-w-[92.5rem] 2xl:max-w-[104.5rem] flex flex-col">
          <div className="flex">
            <h1 className="font-bold text-4xl text-gray-800 dark:text-white leading-5">
              Shopping Cart
            </h1>
          </div>
          <div className="mt-9 flex">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white my-4">
                <span>{`${cartItems?.length ?? 0}`}</span> Products in Cart
              </h3>
              <div className="rounded-md border bg-white shadow border-gray-300 mb-12 p-10">
                {cartItems?.length === 0 ? (
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
                      className="bg-gray-800 hover:bg-gray-600 rounded-md px-5 py-4 text-xl font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-20"
                    >
                      Keep Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <li key={item?.product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item?.product.images && item?.product.images[0]}
                                alt={""}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between  font-medium text-gray-900">
                                  <h3 className="text-gray-800 font-semibold text-xl">
                                    {item?.product.title}
                                  </h3>
                                  <p className="ml-4 text-xl">{formatPrice(item?.product.price)}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                {selectedItemId === item.product.id && isEditing ? (
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
                                        className="border border-gray-300 rounded-md p-1 text-sm w-16"
                                      />
                                    </fieldset>
                                    <Button
                                      type="button"
                                      onClick={handleUpdateQuantity}
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
                                    <p className="text-gray-500">Qty {item?.quantity}</p>
                                    <div className="flex space-x-4 items-center">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          removeFromCart(item.product?.id);
                                        }}
                                        className="font-medium text-red-600 hover:text-red-500"
                                      >
                                        <IconType icon={faTrashAlt} className="h-6" />
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={() => handleEditClick(item.product.id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        <IconType icon={faEdit} className="h-6" />
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
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="max-w-xl self-end w-full">
            <div className="p-6 bg-white rounded-md shadow-md">
              <div className="container border-b border-b-blue-gray-700 pb-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Subtotal : </h2>
                  <p className="text-lg font-semibold text-gray-700">
                    {formatPrice(totalItemsCost)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-medium text-gray-800">Shipping fee :</h2>
                  <p className="text-lg font-semibold text-gray-700">{formatPrice(shippingFee)}</p>
                </div>
              </div>
              <div className="container flex justify-between items-center mt-3">
                <h1 className="text-2xl font-bold">Order Total : </h1>
                <p className="text-lg font-semibold text-gray-700">
                  {formatPrice(totalItemsCost + shippingFee)}
                </p>
              </div>
            </div>
            {!auth ? (
              <Link
                to="/auth/signin"
                className="px-6 py-3 rounded-md bg-gray-800 text-white w-full text-xl font-semibold dark:bg-white dark:text-gray-800"
              >
                Log In
              </Link>
            ) : (
              <Button
                type="button"
                className="px-6 py-3 rounded-md bg-gray-800 text-white mt-3 w-full text-xl font-semibold dark:bg-white dark:text-gray-800"
              >
                Check Out
              </Button>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Cart;

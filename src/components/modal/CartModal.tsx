import { PencilSquareIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/index";
import Button from "../icon/Button";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import {
  useAddItemToCartMutation,
  useGetUserCartQuery,
  useRemoveItemFromCartMutation,
} from "../../features/cart/cart.slice";
import { CartInterface } from "../../types/redux/cart";
import { Dialog } from "@headlessui/react";

export default function CartModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, refetch } = useGetUserCartQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const [removeItemToCart] = useRemoveItemFromCartMutation();
  const { isNewAddedToCart } = useAppSelector((state: RootState) => state.cart);
  
  console.log(isNewAddedToCart);

  const [refreshTrigered, setRefreshTrigered] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [quantityInput, setQuantityInput] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const cartItems = data?.data?.cart as CartInterface;

  const handleEditClick = (id: string) => {
    const selectedItem = cartItems.items.find((item) => item.product._id === id);

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

  const handleUpdateQuantity = async (productId: string) => {
    if (selectedItemId !== null && quantityInput > 0) {
      try {
        const response = await addItemToCart({ productId, quantity: quantityInput }).unwrap();
        setRefreshTrigered(!refreshTrigered);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setSelectedItemId(null);
      setIsEditing(false);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await removeItemToCart(productId).unwrap();
      setRefreshTrigered(!refreshTrigered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refreshTrigered]);

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-20">
      <Dialog.Backdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Dialog.Panel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
              <div className="flex h-full flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </Dialog.Title>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="h-10 w-10 flex items-center justify-center absolute right-4 top-4 rounded-full bg-gray-100"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="py-3">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems?.items?.map((item) => (
                            <li key={item?.product._id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item?.product.imageSrc.url}
                                  alt={""}
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
                                          onChange={(e) =>
                                            setQuantityInput(parseInt(e.target.value))
                                          }
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
                    </div>
                    <Link
                      to="/cart"
                      className="text-base font-semibold text-white py-2.5 px-2 rounded bg-gray-800 w-full block text-center"
                    >
                      Continue to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

import { XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../helpers";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/index";
import { IconType } from "../icon/IconType";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../icon/Button";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";

export default function CartModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { cartItems, isNewAddedToCart } = useAppSelector((state: RootState) => state.cart);

  return (
    <div
      className={classNames(
        "h-screen w-[30rem] bg-white shadow-sm border transition-all fixed top-0 z-10 p-8",
        isNewAddedToCart || isOpen ? "right-0" : "-right-full",
      )}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-10 w-10 flex items-center justify-center absolute right-4 top-8 rounded-full bg-gray-100"
      >
        <span className="sr-only">close button</span>
        <XMarkIcon className="h-7 stroke-[3]" />
      </button>
      <div className="mt-10">
        <div className="py-3">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.map((cartItem) =>
                cartItem.items.map((item) => (
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
                          <h3 className="text-gray-800 font-semibold text-xl">
                            {item?.product.name}
                          </h3>
                          <p className="ml-4 text-xl">{formatPrice(item?.product.price)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {item.product._id ? (
                          <div className="flex items-center space-x-4">
                            <fieldset>
                              <label htmlFor="quantity" className="sr-only">
                                quantity
                              </label>
                              <input
                                id="quantity"
                                type="number"
                                // value={quantityInput}
                                onChange={(e) =>
                                  // setQuantityInput(parseInt(e.target.value))

                                  console.log(e)
                                }
                                className="border border-gray-300 rounded-md p-1 text-sm w-16"
                              />
                            </fieldset>
                            <Button
                              type="button"
                              // onClick={handleUpdateQuantity}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Save
                            </Button>
                            <Button
                              type="button"
                              // onClick={handleCancelEdit}
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
                                  // removeFromCart(item.product?.id)
                                }}
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                <IconType icon={faTrashAlt} className="h-6" />
                              </Button>
                              <Button
                                type="button"
                                // onClick={() => handleEditClick(item.product.id)}
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
                )),
              )}
            </ul>
          </div>
        </div>
        <Link
          to="/cart"
          className="block py-4 px-2 text-center text-xl rounded-md bg-gray-900 text-white"
        >
          continue to check out
        </Link>
      </div>
    </div>
  );
}

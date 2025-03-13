import { Dialog } from "@headlessui/react";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { EllipsisVerticalIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../icon/Button";
import { useState } from "react";
import { classNames } from "../../helpers";

export const NotificationPanel: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { notifications } = useAppSelector((state: RootState) => state.notifications);
  const [openOptions, setOpenOptions] = useState<{ [key: number]: boolean }>({});

  const toggleOptions = (id: number) => {
    setOpenOptions((prev) => {
      return {
        ...prev,
        [id]: !openOptions[id],
      };
    });
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-20">
      <Dialog.Backdrop className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Dialog.Panel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
              <div className="flex h-full flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Notifications
                    </Dialog.Title>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={() => onClose()}
                        className="h-10 w-10 flex items-center justify-center absolute right-4 top-4 rounded-full bg-gray-100"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="py-3">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {(notifications ?? [])?.map((item, index: number) => (
                            <li key={index} className="flex py-4 group">
                              <div className="flex flex-1 items-center space-x-5">
                                <div>
                                  <div className="flex items-center gap-4 font-medium text-gray-900">
                                    <span className="p-2 rounded bg-green-500 w-fit text-gray-100 font-medium capitalize text-sm">
                                      {item?.event_type}
                                    </span>
                                    <p className="text-base font-medium text-gray-500">
                                      {item?.message}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  {/* <p className="text-gray-500">Qty ({item?.quantity})</p> */}
                                  <div className="flex space-x-4 items-center">
                                    <Button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        toggleOptions(index);
                                      }}
                                      className="relative"
                                    >
                                      <EllipsisVerticalIcon className="h-6 group-hover:w-6 group-hover:opacity-100 w-0 opacity-0 transition-all ease-in-out duration-100 text-gray-600" />

                                      <div
                                        className={classNames(
                                          "z-20 -left-28 absolute bottom-0 translate-y-full text-sm w-52 rounded p-1 shadow-md border-[1px] bg-white",
                                          openOptions[index] ? "block" : "hidden"
                                        )}
                                      >
                                        <p
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                          role="button"
                                          className="p-2 text-danger rounded-lg w-full inline-flex items-center hover:bg-secondary"
                                        >
                                          <TrashIcon className="h-4 w-4 mr-2" />
                                          Delete notification
                                        </p>
                                      </div>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

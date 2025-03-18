import React, { useEffect } from "react";
import { Dialog, Tab } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "../icon/Button";
import { useState } from "react";
import { classNames } from "../../helpers";
import {
  deleteNotification,
  Notification,
  setReadNotification,
} from "../../features/notifications/notification.slice";
import { clx } from "../../util";
import { ProductNotificationModal } from "../modal/ProductNotificationModal";

export const NotificationPanel: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { notifications, unread_notifications } = useAppSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useAppDispatch();
  const [openOptions, setOpenOptions] = useState<{ [key: string]: boolean }>({});
  const [openModal, setOpenModal] = useState<{ [key: string]: boolean }>({});

  const getNotificationId = (notification: Notification): string => {
    return notification?.data?._id || "";
  };

  const toggleOptions = (id: string, evt: React.MouseEvent) => {
    evt.stopPropagation();

    setOpenOptions((prev) => {
      return {
        ...prev,
        [id]: !openOptions[id],
      };
    });
  };

  const _openModal = (notification: Notification) => {
    const id = getNotificationId(notification);

    setOpenModal((prev) => {
      return {
        ...prev,
        [id]: true,
      };
    });
  };

  const closeModal = (id: string) => {
    setOpenModal((prev) => {
      return {
        ...prev,
        [id]: false,
      };
    });
  };

  useEffect(() => {
    if (!open) {
      setOpenOptions({});
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenOptions({});
    };

    if (Object.values(openOptions).some(Boolean)) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openOptions]);

  const renderNotificationItem = (notification: Notification, index: number, isUnread: boolean) => {
    const id = getNotificationId(notification);
    return (
      <React.Fragment key={id}>
        {isUnread && (
          <ProductNotificationModal
            open={!!openModal[id]}
            notification={notification}
            onClose={() => closeModal(id)}
          />
        )}
        <li
          key={index}
          className={clx("flex px-2 py-4 group cursor-pointer", isUnread ? "bg-blue-50" : "")}
          onClick={() => {
            if (isUnread) {
              _openModal(notification);

            }
          }}
        >
          <div className="flex flex-1 items-center space-x-5">
            <div>
              <div className="flex items-center gap-4 font-medium text-gray-900">
                <span className="p-2 rounded bg-green-500 w-fit text-gray-100 font-medium capitalize text-sm">
                  {notification?.event_type}
                </span>
                <p className="text-sm font-normal text-gray-500">{notification?.message}</p>
              </div>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              {/* <p className="text-gray-500">Qty ({item?.quantity})</p> */}
              <div className="flex space-x-4 items-center">
                <Button
                  type="button"
                  onClick={(e) => {
                    toggleOptions(id, e);
                  }}
                  className="relative"
                >
                  <EllipsisVerticalIcon className="h-6 group-hover:w-6 group-hover:opacity-100 w-0 opacity-0 transition-all ease-in-out duration-100 text-gray-600" />

                  <div
                    className={classNames(
                      "z-20 -left-28 absolute bottom-0 translate-y-full text-sm w-52 rounded p-1 shadow-md border-[1px] bg-white",
                      openOptions[id] ? "block" : "hidden"
                    )}
                  >
                    {isUnread ? (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(setReadNotification(notification));
                          setOpenOptions((prev) => ({ ...prev, [id]: false }));
                        }}
                        role="button"
                        className="p-2 text-gray-700 rounded-lg w-full inline-flex items-center hover:bg-secondary"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                        Mark as read
                      </p>
                    ) : (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteNotification(notification));
                          setOpenOptions((prev) => ({ ...prev, [id]: false }));
                        }}
                        role="button"
                        className="p-2 text-danger rounded-lg w-full inline-flex items-center hover:bg-secondary"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete notification
                      </p>
                    )}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  };

  return (
    <>
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

                    <Tab.Group>
                      <Tab.List className="flex items-center justify-center gap-6 mt-4 ">
                        <Tab as={React.Fragment}>
                          {({ selected }) => (
                            <button
                              className={clx(
                                selected &&
                                  "text-gray-700 border-b-2 border-indigo-600 font-medium",
                                "focus:outline-none text-base font-satoshi font-normal",
                                unread_notifications.length > 0 ? "flex items-center" : ""
                              )}
                            >
                              New Notifications
                              {unread_notifications.length > 0 && (
                                <span className="ml-2 my-1 bg-red-500 text-white text-sm justify-center flex items-center rounded-full h-6 w-6">
                                  {unread_notifications.length}
                                </span>
                              )}
                            </button>
                          )}
                        </Tab>

                        <Tab as={React.Fragment}>
                          {({ selected }) => (
                            <button
                              className={clx(
                                selected &&
                                  "text-gray-700 border-b-2 border-indigo-600 font-medium",
                                "focus:outline-none text-base font-satoshi font-normal"
                              )}
                            >
                              Read Notifications
                            </button>
                          )}
                        </Tab>
                      </Tab.List>

                      <Tab.Panels className="mt-4">
                        <Tab.Panel>
                          <div className="flow-root">
                            {unread_notifications.length > 0 ? (
                              <ul role="list" className=" divide-y divide-gray-200">
                                {unread_notifications.map((notification, index) =>
                                  renderNotificationItem(notification, index, true)
                                )}
                              </ul>
                            ) : (
                              <div className="py-10 text-center text-gray-500">
                                No new notifications
                              </div>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel>
                          <div className="flow-root">
                            {notifications.length > 0 ? (
                              <ul role="list" className=" divide-y divide-gray-200">
                                {notifications.map((notification, index) =>
                                  renderNotificationItem(notification, index, false)
                                )}
                              </ul>
                            ) : (
                              <div className="py-10 text-center text-gray-500">
                                No read notifications
                              </div>
                            )}
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

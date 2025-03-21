import { useState } from "react";
import { LocalStorage } from "../util";

export const useNotification = () => {
  const [newNotification, setNewNotification] = useState<boolean>(false);
  
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>(
    LocalStorage.get("notifications") || []
  );
  const [notifications, setNotifications] = useState<Notification[]>(
    LocalStorage.get("notifications") || []
  );

  return {
    newNotification,
    setNewNotification,
    unreadNotifications,
    notifications,
    setNotifications,
    setUnreadNotifications,
  };
};

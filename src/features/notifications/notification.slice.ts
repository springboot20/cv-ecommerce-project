import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage, removeCircularReferences } from "../../util";

export interface Notification {
  event_type: string;
  message: string;
  data: any;
}

interface InitialState {
  notifications: Notification[];
  unread_notifications: Notification[];
  isNewNotification: { [key: string]: boolean };
}

const getInitialState = (): InitialState => ({
  notifications: (LocalStorage.get("read_notifications") as Notification[]) ?? [],
  unread_notifications: (LocalStorage.get("new_notifications") as Notification[]) ?? [],
  isNewNotification: {},
});

const initialState: InitialState = getInitialState();

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<Notification>) => {
      const { payload } = action;

      const notificationId = payload?.data?._id;
      console.log(payload?.data?._id);

      if (notificationId) {
        const exists = state.unread_notifications.some((un) => {
          return un?.data?._id === notificationId;
        });

        console.log(exists);

        if (!exists) {
          state.unread_notifications.push(payload);
          state.isNewNotification[payload?.data?._id] = true;

          LocalStorage.set(
            "new_notifications",
            removeCircularReferences(state.unread_notifications)
          );
        }
      }

      console.log(payload);
    },

    setReadNotification: (state, action: PayloadAction<Notification>) => {
      const { data } = action.payload;

      console.log(data);

      const readNotificationIndex = state.unread_notifications.findIndex((n) => {
        return n.data?._id === data?._id;
      });

      if (readNotificationIndex !== -1) {
        const slicedNotification = state.unread_notifications[readNotificationIndex];

        const existsInRead = state.notifications.some(
          (n) => n?.data?._id === slicedNotification?.data?._id
        );

        if (!existsInRead) {
          state.notifications.push(removeCircularReferences(slicedNotification));
        }

        state.unread_notifications = state.unread_notifications.filter(
          (n) => n?.data?._id !== slicedNotification?.data?._id
        );

        state.isNewNotification[slicedNotification?.data?._id] = false;
      }

      LocalStorage.set("read_notifications", removeCircularReferences(state.notifications));
      LocalStorage.set("new_notifications", removeCircularReferences(state.unread_notifications));
    },

    deleteNotification: (state, action: PayloadAction<Notification>) => {
      const { data } = action.payload;
      const notificationId = data?._id;

      if (notificationId) {
        state.notifications = state.notifications.filter((n) => n?.data?._id !== notificationId);

        state.unread_notifications = state.unread_notifications.filter(
          (un) => un?.data?._id !== notificationId
        );

        delete state.isNewNotification[notificationId];

        console.log(
          removeCircularReferences(
            state.notifications.filter((n) => n?.data?._id === notificationId)
          )
        );

        LocalStorage.set("read_notifications", removeCircularReferences(state.notifications));
        LocalStorage.set("new_notifications", removeCircularReferences(state.unread_notifications));
      }
    },
    
    markAllAsRead: (state) => {
      // Move all unread notifications to read notifications array
      for (const notification of state.unread_notifications) {
        const notificationId = notification?.data?._id;
        
        if (notificationId) {
          const existsInRead = state.notifications.some(
            (n) => n?.data?._id === notificationId
          );
          
          if (!existsInRead) {
            state.notifications.push(removeCircularReferences(notification));
          }
          
          // Set notification as not new
          state.isNewNotification[notificationId] = false;
        }
      }
      
      // Clear unread notifications
      state.unread_notifications = [];
      
      // Update local storage
      LocalStorage.set("read_notifications", removeCircularReferences(state.notifications));
      LocalStorage.set("new_notifications", []);
    },

    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unread_notifications = [];
      state.isNewNotification = {};

      LocalStorage.set("read_notifications", []);
      LocalStorage.set("new_notifications", []);
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { setNotification, setReadNotification, deleteNotification } =
  notificationSlice.actions;

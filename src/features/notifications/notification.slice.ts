import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorage } from "../../util";

export interface Notification {
  event_type: string;
  message: string;
  data: any;
}

interface InitialState {
  notifications: Notification[];
}

const getInitialState = (): InitialState => ({
  notifications: LocalStorage.get("notifications") as Notification[],
});

const initialState: InitialState = getInitialState();

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: () => ({
    setNotification: (state, action: PayloadAction<Notification>) => {
      const { payload } = action;
      state.notifications.push(payload);

      console.log(payload);

      LocalStorage.set("notifications", state.notifications);
    },
  }),
});

export const notificationReducer = notificationSlice.reducer;
export const { setNotification } = notificationSlice.actions;

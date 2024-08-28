import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/auth.reducer";
import { ApiService, rtkQueryErrorLogger } from "./services/api.service";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [ApiService.reducerPath]: ApiService.reducer,
  },
  middleware: (gMD) => gMD().concat(ApiService.middleware).concat(rtkQueryErrorLogger),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

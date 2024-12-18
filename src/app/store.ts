import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/auth.reducer";
import { ApiService } from "./services/api.service";
import { addressReducer } from "../features/order/address.reducer";
import { cartReducer } from "../helpers/cart/cart.reducer";
import { productReducer } from "../features/products/product.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    cart:cartReducer,
    product:productReducer,
    [ApiService.reducerPath]: ApiService.reducer,
  },
  middleware: (gMD) =>
    gMD({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // Optional: Disable SerializableStateInvariantMiddleware
    }).concat(ApiService.middleware),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

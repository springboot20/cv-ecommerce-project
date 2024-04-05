import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from './services/api.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSliceReducer from '../features/auth/auth.slice';
import ProductSliceReducer from '../features/product/product.slice';
import CartSliceReducer from '../features/cart/cart.slice';

export const Store = configureStore({
  reducer: {
    auth: authSliceReducer,
    product: ProductSliceReducer,
    cart: CartSliceReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

setupListeners(Store.dispatch);

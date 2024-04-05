import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from './services/api.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import AuthSliceReducer from '../features/auth/auth.slice';
import ProductSliceReducer from '../features/product/product.slice';
import CartSliceReducer from '../features/cart/cart.slice';
import AppContextSliceReducer from '../features/context/context.slice';

export const Store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    product: ProductSliceReducer,
    cart: CartSliceReducer,
    context: AppContextSliceReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

setupListeners(Store.dispatch);

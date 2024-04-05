import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { PrivateRoute } from '../components/Private.routes';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { Product } from '../pages/Product';
import { Cart } from '../pages/Cart';
import CheckOut from '../pages/CheckOut';
import { Payment } from '../pages/Payment';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { NotFound } from '../components/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <ErrorBoundary>
            <AppLayout />
          </ErrorBoundary>
        }>
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path='/collections'
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path='/collections/:id'
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />

        <Route
          path='/cart'
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path='/check-out'
          element={
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          }
        />

        <Route
          path='/payment'
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

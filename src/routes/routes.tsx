import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { Product } from '../pages/Product';
import { Cart } from '../pages/Cart';
import { NotFound } from '../components/NotFound';
import { PrivateRoute } from '../components/Private.routes';
import { PublicRoute } from '../components/Public.routes';
import { AppLayout } from '../layout/AppLayout';
import { ErrorBoundary } from '../components/ErrorBoundary';
import CheckOut from '../pages/CheckOut';
import { Payment } from '../pages/Payment';

export const routes = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: 'collections',
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: '/collections/:id',
        element: (
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: '/check-out',
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment',
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = lazy(() => import('../components/Private.routes'));
const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const Product = lazy(() => import('../pages/Product'));
const Cart = lazy(() => import('../pages/Cart'));
const Payment = lazy(() => import('../pages/Payment'));
const CheckOut = lazy(() => import('../pages/CheckOut'));
const Notfound = lazy(() => import('../components/NotFound'));

interface Routes {
  [key: string]: {
    path: string;
    element: JSX.Element;
  }[];
}

export const routes: Routes = {
  default: [
    {
      path: '/',
      element: <Navigate to='/' />,
    },
    {
      path: '/login',
      element: <Navigate to='/login' />,
    },
    {
      path: '/collections/:id',
      element: (
        <PrivateRoute>
          <Product />
        </PrivateRoute>
      ),
    },
  ],
};

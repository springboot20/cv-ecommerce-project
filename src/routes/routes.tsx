import { Navigate } from 'react-router-dom';
import {
  Home,
  Products,
  Product,
  Cart,
  CheckOut,
  Payment,
  Notfound,
  PrivateRoute,
} from './lazy.import';

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
      path: '/home',
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: '/collections',
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
      path: '/cart',
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
      element: <Notfound />,
    },
  ],
};

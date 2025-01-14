import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import AppLayout from '../layout/app/AppLayout';
import AdminLayout from '../layout/admin/AdminLayout';
import AdminLogin from '../pages/admin/login/Login';
import CreateNewProduct from '../pages/admin/product/create/CreateProduct';
import EditProduct from '../pages/admin/product/edit/EditProduct';
import AdminProducts from '../pages/admin/product/products/Products';
import AdminUserEdit from '../pages/admin/users/edit/EditUser';
import { AdminDashboardLayout } from '../layout/admin/AdminLayout';
import { ProtectedRoute, AdminProtectedRoute } from '../components/Private.routes';
import { AdminPublicRoute } from '../components/Public.routes';
import AdminOrders from '../pages/admin/orders/Orders';
import AdminOrderDetails from '../pages/admin/orders/orderDetails/OrderDetail';
import { FormProvider } from '../context/FormContext';
import { AcceptedRoles } from '../types/redux/auth';

const RegisterLayout = lazy(() => import('../layout/auth/register/RegisterLayout'));
const ForgotLayout = lazy(() => import('../layout/auth/forgot/ForgotLayout'));

const AdminOverview = lazy(() => import('../pages/admin/overview/Overview'));
const AdminUsers = lazy(() => import('../pages/admin/users/Users'));
const Home = lazy(() => import('../pages/home/Home'));
const Products = lazy(() => import('../pages/products/Products'));
const Product = lazy(() => import('../pages/product/Product'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const CheckOut = lazy(() => import('../pages/check-out/CheckOut'));
const Orders = lazy(() => import('../pages/orders/Orders'));
const OrderDetails = lazy(() => import('../pages/orders/orderDetails/OrderDetail'));
const Notfound = lazy(() => import('../components/NotFound'));
const PublicRoute = lazy(() => import('../components/Public.routes'));
const Login = lazy(() => import('../pages/auth/login/Signin'));
const Forgot = lazy(() => import('../pages/auth/forgot/Forgot'));
const Register = lazy(() => import('../pages/auth/register/Register'));
const Settings = lazy(() => import('../pages/settings/Settings'));
const Profile = lazy(() => import('../pages/settings/profile/Profile'));
const EmailVerification = lazy(() => import('../pages/verifications/email/EmailVerification'));

const Router = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'collections',
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: 'collections/:id',
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: 'cart',
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: 'check-out',
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
                  <CheckOut />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
                  <Orders />
                </ProtectedRoute>
              ),
            },
            {
              path: ':orderId',
              element: (
                <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
                  <OrderDetails />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'settings',
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <Settings />
            </ProtectedRoute>
          ),
          children: [
            {
              path: 'profile',
              element: <Profile />,
            },
            {
              path: 'account',
            },
          ],
        },
        {
          path: 'verify-email',
          element: <EmailVerification />,
        },
      ],
    },

    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        {
          element: (
            <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
              <AdminDashboardLayout />
            </AdminProtectedRoute>
          ),
          children: [
            {
              path: 'overview',
              element: (
                <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                  <AdminOverview />
                </AdminProtectedRoute>
              ),
            },
            {
              path: 'orders',
              children: [
                {
                  index: true,
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminOrders />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: ':orderId',
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminOrderDetails />
                    </AdminProtectedRoute>
                  ),
                },
              ],
            },
            {
              path: 'products',
              children: [
                {
                  path: 'all',
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminProducts />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: 'create',
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                      <CreateNewProduct />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: 'edit/:id',
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                      <EditProduct />
                    </AdminProtectedRoute>
                  ),
                },
              ],
            },
            {
              path: 'users',
              children: [
                {
                  index: true,
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminUsers />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: 'edit/:userId',
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                      <AdminUserEdit />
                    </AdminProtectedRoute>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: 'login',
          element: (
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          ),
        },
        {
          path: 'logout',
          element: <Navigate to={'/admin/login'} />,
        },
      ],
    },
    {
      path: 'register',
      element: (
        <FormProvider>
          <RegisterLayout />
        </FormProvider>
      ),
      children: [
        {
          index: true,
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: 'forgot',
      element: (
        <FormProvider>
          <ForgotLayout />
        </FormProvider>
      ),
      children: [
        {
          index: true,
          element: (
            <PublicRoute>
              <Forgot />
            </PublicRoute>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Notfound />,
    },
  ]);
};
export default Router;

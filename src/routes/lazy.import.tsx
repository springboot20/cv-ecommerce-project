import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../layout/app/AppLayout";
import AdminLayout from "../layout/admin/AdminLayout";
import AdminLogin from "../pages/admin/login/Login";
import CreateNewProduct from "../pages/admin/product/create/CreateProduct";
import EditProduct from "../pages/admin/product/edit/EditProduct";
import AdminProducts from "../pages/admin/product/products/Products";
import AdminUserEdit from "../pages/admin/users/edit/EditUser";
import { AdminDashboardLayout } from "../layout/admin/AdminLayout";

const AdminOverview = lazy(() => import("../pages/admin/overview/Overview"));
const AdminUsers = lazy(() => import("../pages/admin/users/Users"));
const PrivateRoute = lazy(() => import("../components/Private.routes"));
const Home = lazy(() => import("../pages/home/Home"));
const Products = lazy(() => import("../pages/products/Products"));
const Product = lazy(() => import("../pages/product/Product"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Payment = lazy(() => import("../pages/payment/Payment"));
const CheckOut = lazy(() => import("../pages/check-out/Checkout"));
const Notfound = lazy(() => import("../components/NotFound"));
const PublicRoute = lazy(() => import("../components/Public.routes"));
const Login = lazy(() => import("../pages/auth/Signin"));
const Register = lazy(() => import("../pages/auth/Signup"));

const Settings = lazy(() => import("../pages/settings/Settings"));
const Profile = lazy(() => import("../pages/settings/profile/Profile"));

const Router = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "collections",
          element: (
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          ),
        },
        {
          path: "collections/:id",
          element: (
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          ),
        },
        {
          path: "check-out",
          element: (
            <PublicRoute>
              <CheckOut />
            </PublicRoute>
          ),
        },
        {
          path: "payment",
          element: (
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          ),
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "account",
            },
          ],
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          element: <AdminDashboardLayout />,
          children: [
            {
              path: "products",
              children: [
                {
                  path: "all",
                  element: <AdminProducts />,
                },
                {
                  path: "users",
                  children: [
                    {
                      index: true,
                      element: <AdminUsers />,
                    },
                    {
                      path: "edit/:userId",
                      element: <AdminUserEdit />,
                    },
                  ],
                },
                {
                  path: "overview",
                  element: <AdminOverview />,
                },
                {
                  path: "create",
                  element: <CreateNewProduct />,
                },
                {
                  path: "edit/:id",
                  element: <EditProduct />,
                },
              ],
            },
          ],
        },
        {
          path: "login",
          element: <AdminLogin />,
        },
      ],
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
};
export default Router;

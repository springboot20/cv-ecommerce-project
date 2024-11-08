import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AdminDashboardLayout } from "../layout/admin/AdminLayout";
import CreateNewProduct from "../pages/admin/product/create/CreateProduct";

const AppLayout = lazy(() => import("../layout/app/AppLayout"));
const AdminLayout = lazy(() => import("../layout/admin/AdminLayout"));
const PrivateRoute = lazy(() => import("../components/Private.routes"));
const Home = lazy(() => import("../pages/home/Home"));
const Products = lazy(() => import("../pages/products/Products"));
const Product = lazy(() => import("../pages/product/Product"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Payment = lazy(() => import("../pages/payment/Payment"));
const CheckOut = lazy(() => import("../pages/check-out/CheckOut"));
const Notfound = lazy(() => import("../components/NotFound"));
const PublicRoute = lazy(() => import("../components/Public.routes"));
const Login = lazy(() => import("../pages/auth/Signin"));
const Register = lazy(() => import("../pages/auth/Signup"));

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
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
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
              path: "product",
              children: [
                {
                  path: "overview",
                  element: <CreateNewProduct />,
                },
                {
                  path: "create",
                  element: <CreateNewProduct />,
                },
              ],
            },
          ],
        },
        {
          path: "login",
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

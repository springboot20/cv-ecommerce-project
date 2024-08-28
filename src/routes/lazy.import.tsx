import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Token, User } from "../types/redux/auth";

const AppLayout = lazy(() => import("../layout/AppLayout"));
const PrivateRoute = lazy(() => import("../components/Private.routes"));
const Home = lazy(() => import("../pages/home/Home"));
const Products = lazy(() => import("../pages/product/Products"));
const Product = lazy(() => import("../pages/product/Product"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Payment = lazy(() => import("../pages/payment/Payment"));
const CheckOut = lazy(() => import("../pages/check-out/CheckOut"));
const Notfound = lazy(() => import("../components/NotFound"));
const PublicRoute = lazy(() => import("../components/Public.routes"));
const Login = lazy(() => import("../pages/auth/Signin"));
const Register = lazy(() => import("../pages/auth/Signup"));

const Router = (tokens: Token, user: User) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: tokens && user._id ? <Navigate to="/" /> : <Navigate to="/login" />,
        },
        {
          index: true,
          element: (
            <PublicRoute>
              <Home />
            </PublicRoute>
          ),
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

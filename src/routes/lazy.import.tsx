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
import { ProtectedRoute } from "../components/Private.routes";

const AdminOverview = lazy(() => import("../pages/admin/overview/Overview"));
const AdminUsers = lazy(() => import("../pages/admin/users/Users"));
const Home = lazy(() => import("../pages/home/Home"));
const Products = lazy(() => import("../pages/products/Products"));
const Product = lazy(() => import("../pages/product/Product"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const CheckOut = lazy(() => import("../pages/check-out/Checkout"));
const Notfound = lazy(() => import("../components/NotFound"));
const PublicRoute = lazy(() => import("../components/Public.routes"));
const Login = lazy(() => import("../pages/auth/Signin"));
const Register = lazy(() => import("../pages/auth/Signup"));

const Settings = lazy(() => import("../pages/settings/Settings"));
const Profile = lazy(() => import("../pages/settings/profile/Profile"));

enum AcceptedRoles {
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR",
}

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
            <ProtectedRoute roles={[AcceptedRoles.USER]}>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "collections/:id",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER]}>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER]}>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "check-out",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER]}>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER]}>
              <Settings />
            </ProtectedRoute>
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
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          element: (
            <ProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
              <AdminDashboardLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "products",
              children: [
                {
                  path: "all",
                  element: (
                    <ProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminProducts />
                    </ProtectedRoute>
                  ),
                },
                {
                  path: "users",
                  children: [
                    {
                      index: true,
                      element: (
                        <ProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                          <AdminUsers />
                        </ProtectedRoute>
                      ),
                    },
                    {
                      path: "edit/:userId",
                      element: (
                        <ProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                          <AdminUserEdit />
                        </ProtectedRoute>
                      ),
                    },
                  ],
                },
                {
                  path: "overview",
                  element: (
                    <ProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminOverview />
                    </ProtectedRoute>
                  ),
                },
                {
                  path: "create",
                  element: (
                    <ProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                      <CreateNewProduct />
                    </ProtectedRoute>
                  ),
                },
                {
                  path: "edit/:id",
                  element: (
                    <ProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                      <EditProduct />
                    </ProtectedRoute>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "login",
          element: (
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          ),
        },
      ],
    },
    {
      path: "register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      path: "login",
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

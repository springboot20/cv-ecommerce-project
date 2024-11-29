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
import { ProtectedRoute, AdminProtectedRoute } from "../components/Private.routes";
import { AdminPublicRoute } from "../components/Public.routes";

const AdminOverview = lazy(() => import("../pages/admin/overview/Overview"));
const AdminUsers = lazy(() => import("../pages/admin/users/Users"));
const Home = lazy(() => import("../pages/home/Home"));
const Products = lazy(() => import("../pages/products/Products"));
const Product = lazy(() => import("../pages/product/Product"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const CheckOut = lazy(() => import("../pages/check-out/CheckOut"));
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
          element: (
            <Home />
          ),
        },
        {
          path: "collections",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "collections/:id",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "check-out",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <ProtectedRoute roles={[AcceptedRoles.USER, AcceptedRoles.ADMIN]}>
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
            <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
              <AdminDashboardLayout />
            </AdminProtectedRoute>
          ),
          children: [
            {
              path: "products",
              children: [
                {
                  path: "all",
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminProducts />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: "users",
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
                      path: "edit/:userId",
                      element: (
                        <AdminProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                          <AdminUserEdit />
                        </AdminProtectedRoute>
                      ),
                    },
                  ],
                },
                {
                  path: "overview",
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN, AcceptedRoles.MODERATOR]}>
                      <AdminOverview />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: "create",
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                      <CreateNewProduct />
                    </AdminProtectedRoute>
                  ),
                },
                {
                  path: "edit/:id",
                  element: (
                    <AdminProtectedRoute roles={[AcceptedRoles.ADMIN]}>
                      <EditProduct />
                    </AdminProtectedRoute>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "login",
          element: (
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
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

import { lazy } from 'react';

export const PrivateRoute = lazy(() => import('../components/Private.routes'));
export const Home = lazy(() => import('../pages/Home'));
export const Products = lazy(() => import('../pages/Products'));
export const Product = lazy(() => import('../pages/Product'));
export const Cart = lazy(() => import('../pages/Cart'));
export const Payment = lazy(() => import('../pages/Payment'));
export const CheckOut = lazy(() => import('../pages/CheckOut'));
export const Notfound = lazy(() => import('../components/NotFound'));
export const PublicRoute = lazy(() => import('../components/Public.routes'));
export const Login = lazy(() => import('../pages/Signin'));
export const Register = lazy(() => import('../pages/Signup'));

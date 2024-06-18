import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { AppLayout } from './layout/AppLayout'
import {
  Home,
  Products,
  Product,
  Cart,
  CheckOut,
  Payment,
  Notfound,
  PrivateRoute,
  PublicRoute,
  Login,
  Register,
} from './routes/lazy.import'

function App() {
  const { isAuthenticated, token } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={
          !(token && isAuthenticated) ? (
            <Navigate to="/login" />
          ) : (
            <Navigate to="/home" />
          )
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route element={<AppLayout />}>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/collections"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/collections/:id"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/check-out"
          element={
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  )
}

export default App

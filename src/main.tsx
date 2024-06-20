import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter } from 'react-router-dom'
import { Loader } from './components/Loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { ThemeContextProvider } from './context/ThemeContext'
import { AuthContextProvider } from './context/AuthContext'
import { CartContextProvider } from './context/CartContext'
import { ProductContextProvider } from './context/ProductContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ThemeContextProvider>
          <AuthContextProvider>
            <ProductContextProvider>
              <CartContextProvider>
                <ToastContainer />
                <Suspense fallback={<Loader />}>
                  <App />
                </Suspense>
              </CartContextProvider>
            </ProductContextProvider>
          </AuthContextProvider>
        </ThemeContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

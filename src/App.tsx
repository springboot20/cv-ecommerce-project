import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContextProvider } from './context/ThemeContext';
import { ThemeProvider } from '@material-tailwind/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AppRouter } from './router/AppRouter';
import { AuthRouter } from './router/Auth.router';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ThemeContextProvider>
          <ToastContainer />
          {isAuthenticated ? <AuthRouter /> : <AppRouter />}
        </ThemeContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

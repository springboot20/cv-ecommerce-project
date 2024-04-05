import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContextProvider } from './context/ThemeContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AuthRouter } from './router/Auth.router';
import { useAuth } from './hooks/useAuth';
import { Suspense } from 'react';
import { AppContextProvider } from './features/context/Appcontext';
import { Loader } from './components/Loader';
import AppRouter from './router/AppRouter';
import { AppLayout } from './layout/AppLayout';

const DefaultApp = () => {
  return (
    <AppContextProvider>
      <ThemeContextProvider>
        <ToastContainer />
        <Suspense fallback={<Loader />}>
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </Suspense>
      </ThemeContextProvider>
    </AppContextProvider>
  );
};

function App() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <DefaultApp />;
  } else {
    return <AuthRouter />;
  }
}

export default App;

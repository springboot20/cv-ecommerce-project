import { Suspense } from 'react';
import { AppContextProvider } from '../features/context/Appcontext';
import { Loader } from '../components/Loader';
import AppRouter  from '../router/AppRouter';

const EcommerceApp = () => (
  <AppContextProvider>
    <Suspense fallback={<Loader />}>
      <AppRouter />
    </Suspense>
  </AppContextProvider>
);

export default EcommerceApp;

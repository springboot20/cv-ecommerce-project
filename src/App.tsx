import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from './routes/routes';
import { ModeProvider } from './context/ThemeContext';
import { ThemeProvider } from '@material-tailwind/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <ModeProvider>
          <ToastContainer />
          <RouterProvider router={routes} />
        </ModeProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

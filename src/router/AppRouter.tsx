import { useEffect } from 'react';
import { RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { routes } from '../routes/routes';
import { useAppContext } from '../features/context/AppContext';
import { open, defaultApp } from '../features/context/context.slice';

export default function AppRouter() {
  const location = useLocation();
  const [currentApp, dispatch] = useAppContext();

  const routesList = routes[currentApp] || [];

  function getAppNameByPath(path: string): string {
    for (const key in routes) {
      for (let i = 0; i < routes[key].length; i++) {
        if (routes[key][i].path === path) {
          return key;
        }
      }
    }
    // Return 'default' app if the path is not found
    return 'default';
  }

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(defaultApp());
    } else {
      const appName = getAppNameByPath(location.pathname);
      dispatch(open({ appName }));
    }
  }, [location.pathname, dispatch]);

  // Generate routes for useRoutes hook
  const reactRouterRoutes: RouteObject[] = routesList.map((route) => ({
    path: route.path,
    element: route.element,
  }));

  const element = useRoutes(reactRouterRoutes);

  return element;
}

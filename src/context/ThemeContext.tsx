import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ThemeContextInterface } from '../types/theme.types';
import { LocalStorage } from '../util';

const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string | null>(LocalStorage.get('theme'));
  const dark = 'dark';
  const light = 'light';

  const defaultTheme = light;
  const [activeMode, setActiveMode] = useState(defaultTheme === theme);
  const documentEle = window.document.documentElement;

  const activateTheme = useCallback(
    (theme: string) => {
      documentEle.classList.remove(dark, light);
      documentEle.classList.add(theme);

      setActiveMode(theme === dark);
      LocalStorage.set('theme', theme);
    },
    [dark, documentEle.classList, light]
  );

  useEffect(() => {
    if (theme === dark) activateTheme(dark);
    if (theme === light) activateTheme(light);

    if (!theme) {
      const preferTheme = (theme: string) => `prefers-color-scheme:${theme}`;

      if (window.matchMedia(preferTheme(dark)).matches) activateTheme(dark);
      else if (window.matchMedia(preferTheme(light)).matches) activateTheme(light);
      else activateTheme(defaultTheme);

      window.matchMedia(preferTheme(dark)).addEventListener('change', (event) => {
        if (event.matches) activateTheme(dark);
      });
      window.matchMedia(preferTheme(light)).addEventListener('change', (event) => {
        if (event.matches) activateTheme(light);
      });
    }
  }, [activateTheme, light, defaultTheme, dark, theme]);

  return (
    <ThemeContext.Provider value={{ setTheme, activateTheme, activeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

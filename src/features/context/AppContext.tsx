import { createContext, useContext, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type ContextValueType = [string, ReturnType<typeof useAppDispatch>];

const AppContext = createContext<ContextValueType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get dispatch function using custom hook
  const dispatch = useAppDispatch();

  // Get currentApp state from Redux store using custom hook
  const { currentApp } = useAppSelector((state) => state.context);

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => [currentApp, dispatch] as ContextValueType, [currentApp, dispatch]);

  // Provide the context value to the children components
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  // Return the context value
  return context;
};

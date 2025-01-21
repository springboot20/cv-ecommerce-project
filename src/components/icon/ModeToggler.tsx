import React from 'react';
import Button from './Button';

export const ModeToggler: React.FC<{
  icon: JSX.Element;
  active: boolean;
  setTheme: React.Dispatch<React.SetStateAction<string | null>>;
  activate: (theme: string) => void;
  className: string | undefined;
}> = ({ icon, active, setTheme, activate, className }) => {
  const toggleTheme = () => {
    if (active) {
      activate('light');
      setTheme('light');
    } else {
      activate('dark');
      setTheme('dark');
    }
  };
  return (
    <Button type='button' className={className} onClick={toggleTheme}>
      {icon}
    </Button>
  );
};

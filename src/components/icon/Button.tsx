import React from 'react';

const Button = ({ children, ...rest }: React.ComponentProps<'button'>) => {
  return <button {...rest}>{children}</button>;
};

export default Button;

import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import React from "react";

type ButtonProps = React.ComponentProps<"button">;

export const Button = ({ children, ...rest }: ButtonProps) => {
  return <button {...rest}>{children}</button>;
};

export const Icon = ({ icon, onClick, ...rest }: FontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={icon} {...rest} onClick={onClick} />;
};

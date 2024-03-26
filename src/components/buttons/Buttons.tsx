import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ButtonProps } from '../../types';


export const Button = ({ children, ...rest }: ButtonProps) => {
  return <button {...rest}>{children}</button>;
};

export const Icon = ({ icon, onClick, ...rest }: FontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={icon} {...rest} onClick={onClick } />;
};

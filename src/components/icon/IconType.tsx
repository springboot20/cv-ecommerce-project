import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export const IconType = ({ icon, ...rest }: FontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={icon} {...rest} />;
};

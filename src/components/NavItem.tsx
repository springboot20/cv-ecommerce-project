import { NavLink, NavLinkProps } from "react-router-dom";
import React from "react";
import { clx } from "../util";

interface NavItemProps extends NavLinkProps {
  to: string;
  className: string;
  children: ({ isActive }: { isActive: boolean }) => React.ReactNode;
  activeClass?: string;
  close?: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null>) => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  to,
  children,
  className,
  activeClass,
  close,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clx(
          'flex items-center space-x-4 relative w-full transition ease delay-400 before:content-[""] before:absolute before:left-0 before:w-1.5 before:rounded-tr-lg before:rounded-br-lg before:h-11 before:top-1/2 before:-translate-y-1/2',
          isActive && clx("bg-[#F8F8F8] text-gray-700 before:bg-[#5932EA]", activeClass!),
          className,
        )
      }
      onClick={() => {
        if (close) {
          close();
        }
      }}
    >
      {({ isActive }) => children({ isActive })}
    </NavLink>
  );
};

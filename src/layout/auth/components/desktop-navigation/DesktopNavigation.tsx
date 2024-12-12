import React from "react";
import { NavigationType } from "../../../../types";

export const DesktopNavigation: React.FC<{ steps: NavigationType[] }> = ({ steps }) => {
  return (
    <div className="hidden lg:block h-screen bg-[#F9FAFB] max-w-[28rem] w-full p-4">
      <div className="flex flex-col justify-between h-full">
        <ul className="space-y-8 mt-16" role="menu">
          {steps.map(({ Icon, description, title }) => {
            return (
              <li className="flex items-start gap-2" role="menuitem" key={title}>
                <span className="flex items-center justify-center border size-12 rounded-full bg-white">
                  <Icon className="h-6 text-gray-600" strokeWidth={2} />
                </span>

                <div className="-space-y-0.5">
                  <h3 className="text-lg font-medium text-[#344054]">{title}</h3>
                  <span className="text-base font-normal text-[#475467]">{description}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

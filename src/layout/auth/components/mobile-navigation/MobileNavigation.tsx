import React from "react";
import { NavigationType } from "../../../../types";



export const MobileNavigation: React.FC<{ steps: NavigationType[] }> = ({ steps }) => {
  return (
    <div className="lg:hidden h-40 bg-[#F9FAFB] w-full p-4">
      <ul className="flex items-center justify-center h-full" role="menu">
        {steps.map(({ Icon, title }) => {
          return (
            <li
              className="flex items-center flex-col gap-2 max-w-xl w-full"
              role="menuitem"
              key={title}
            >
              <span className="flex items-center justify-center border size-12 rounded-full bg-white">
                <Icon className="h-6 text-gray-600" strokeWidth={2} />
              </span>
              <h3 className="hidden sm:block text-sm font-normal text-[#344054]">{title}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

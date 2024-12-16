import React from "react";
import { NavigationType } from "../../../../types";
import { useForm } from "../../../../hooks/useForm";
import { classNames } from "../../../../helpers";

export const MobileNavigation: React.FC<{ steps: NavigationType[] }> = ({ steps }) => {
  const { currentStep } = useForm();

  return (
    <div className="lg:hidden h-36 bg-[#F9FAFB] w-full p-4">
      <div className="flex items-center justify-center h-full" role="menu">
        {steps.map(({ Icon, title }, index) => {
          return (
            <button
              className={classNames(
                "flex items-center flex-col gap-2 max-w-xl w-full cursor-pointer relative",
              )}
              role="menuitem"
              key={title}
            >
              <span
                className={classNames(
                  currentStep === index ? "bg-white transition-all" : "bg-[#EAECF0]",
                  "flex items-center justify-center border size-12 rounded-full bg-white",
                )}
              >
                <Icon
                  className={classNames(
                    "h-6 transition-all",
                    currentStep === index ? "" : "text-gray-600",
                  )}
                  strokeWidth={2}
                />
              </span>
              <h3
                className={classNames(
                  currentStep === index ? "text-[#475467]" : "text-[#475467]/50",
                  "hidden sm:block text-sm font-normal text-[#344054]",
                )}
              >
                {title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
};

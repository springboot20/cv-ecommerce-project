import React from "react";
import { NavigationType } from "../../../../types";
import { useForm } from "../../../../hooks/useForm";
import { classNames } from "../../../../helpers";

export const DesktopNavigation: React.FC<{ steps: NavigationType[] }> = ({ steps }) => {
  const { currentStep } = useForm();

  return (
    <div className="hidden lg:block h-screen bg-[#F9FAFB] max-w-[28rem] w-full p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-8 mt-16" role="menu">
          {steps.map(({ Icon, description, title }, index) => {
            return (
              <button
                className={classNames(
                  "flex items-start gap-2 cursor-pointer relative before:content-[''] before:absolute before:w-0.5 before:translate-x-[1.4rem] before:translate-y-12 before:bg-gray-400",
                  index === steps.length - 1 ? "before:h-0" : "before:h-10",
                )}
                role="menuitem"
                key={title}
              >
                <span
                  className={classNames(
                    "flex items-center justify-center border size-12 rounded-full transition-all",
                    currentStep === index ? "bg-white transition-all" : "bg-[#EAECF0]",
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

                <div className="-space-y-0.5 flex items-start flex-col">
                  <h3
                    className={classNames(
                      "text-lg font-medium transition-all",
                      currentStep === index ? "text-[#344054]" : "text-[#344054]/50",
                    )}
                  >
                    {title}
                  </h3>

                  <span
                    className={classNames(
                      "text-base font-normal transition-all",
                      currentStep === index ? "text-[#475467]" : "text-[#475467]/50",
                    )}
                  >
                    {description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

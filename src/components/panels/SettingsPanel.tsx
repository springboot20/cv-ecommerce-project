import { Disclosure } from "@headlessui/react";
import { Cog6ToothIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { clx } from "../../util";
import { NavItem } from "../NavItem";

const settingsRoutes = [
  {
    to: "/settings/profile",
    label: "public profile",
    Icon: UserIcon,
    current: true,
  },
  {
    to: "/settings/account",
    label: "account",
    Icon: Cog6ToothIcon,
    current: true,
  },
];

export const SettingsPanel: React.FC = () => {
  return (
    <>
      <div className="fixed hidden lg:block flex-1 max-w-sm min-h-screen top-[7.25rem] w-full flex-col border-r">
        <div className="w-full h-full p-2.5">
          <Disclosure.Button className="lg:hidden absolute right-8 top-4">
            <span className="sr-only">Close side panel</span>
            <XMarkIcon className="h-6" aria-hidden={true} />
          </Disclosure.Button>
          <div className="relative mt-4 pb-3 border-b">
            <h1 className="sm:text-lg lg:text-xl font-medium">Settings</h1>
            <div className="flex flex-col items-center w-full mt-4 space-y-1">
              {settingsRoutes.map(({ label, Icon, to, current }) => (
                <NavItem
                  to={to}
                  key={label}
                  aria-current={current ? "page" : undefined}
                  className={clx(
                    current ? "hover:bg-[#F8F8F8]" : "",
                    "py-2.5 px-4 w-full transition",
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={clx(isActive ? "stroke-[#5932EA]" : "stroke-[#7B7B7B]", "h-6")}
                      />
                      <span
                        className={clx(
                          "text-base font-roboto capitalize",
                          isActive ? "text-[#5932EA] font-medium" : "text-[#0C0C0D] font-normal",
                        )}
                      >
                        {label}
                      </span>
                    </>
                  )}
                </NavItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="lg:hidden">
        <div className="fixed left-0 max-w-lg lg:max-w-md right-0 h-[calc(100vh-8.5rem)] top-[8.5rem] flex-col bg-white border z-10">
          <div className="w-full h-full p-4">
            <Disclosure.Button className="lg:hidden absolute right-8 top-4">
              <span className="sr-only">Close side panel</span>
              <XMarkIcon className="h-6" aria-hidden={true} />
            </Disclosure.Button>

            <div className="relative mt-4 pb-5 border-b">
              <h1 className="sm:text-lg lg:text-xl font-medium">Settings</h1>
              <div className="flex flex-col items-center w-full mt-4 space-y-1">
                {settingsRoutes.map(({ label, Icon, to, current }) => (
                  <NavItem
                    to={to}
                    key={label}
                    aria-current={current ? "page" : undefined}
                    className={clx(
                      current ? "hover:bg-[#F8F8F8]" : "",
                      "py-2.5 px-4 w-full transition",
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={clx(isActive ? "stroke-[#5932EA]" : "stroke-[#7B7B7B]", "h-6")}
                        />
                        <span
                          className={clx(
                            "text-base font-roboto capitalize",
                            isActive ? "text-[#5932EA] font-medium" : "text-[#0C0C0D] font-normal",
                          )}
                        >
                          {label}
                        </span>
                      </>
                    )}
                  </NavItem>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Disclosure.Panel>
    </>
  );
};

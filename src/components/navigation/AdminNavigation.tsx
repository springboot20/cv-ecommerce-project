import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const AdminNavigationComponent: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <nav className="fixed inset-0 h-20 bg-white border-b">
      <div className="px-8 h-full flex items-center justify-between">
        <div className="flex items-center justify-center lg:justify-start">
          <h1 className="flex items-center space-x-0.5 text-2xl font-semibold capitalize">
            <span className="text-[#5932EA]">shopping</span>
            <span>cart</span>
          </h1>
        </div>

        <div className="flex items-center lg:hidden">
          <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-1 dark:text-white text-gray-900 bg-gray-50 hover:dark:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black/20">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </Disclosure.Button>
        </div>
      </div>
    </nav>
  );
};

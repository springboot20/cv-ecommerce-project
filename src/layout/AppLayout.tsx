import { Fragment, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
  UserIcon,
} from "@heroicons/react/24/outline";
// import CartModal from '../components/modal/CartModal'

const navigation = [
  { to: "/", name: "home", current: true },
  { to: "/collections", name: "collections", current: true },
  { to: "/home", name: "essentials", current: true },
  { to: "/sales", name: "best ", current: true },
  { to: "/home", name: "about us", current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const handleActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(
    isActive ? "text-gray-800" : "text-gray-600",
    "block rounded-md px-3 py-2 text-lg font-medium flex-shrink-0 capitalize",
  );
};

const AppLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Disclosure
        as="nav"
        className={`fixed top-0 left-0 z-20 right-0 dark:bg-gray-800 bg-white border-b border-black/20`}
      >
        {({ open }) => (
          <>
            {/* <CartModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-4 xl:p-0">
              <div className="relative">
                <div className="flex items-center justify-end py-2 h-14 space-x-3">
                  <ul className="flex items-center space-x-4">
                    <li className="text-lg font-medium text-gray-800">
                      <Link to="#">Return</Link>
                    </li>
                    <li className="text-lg font-medium text-gray-800">
                      <Link to="#">Help</Link>
                    </li>
                    <li className="text-lg font-medium text-gray-800">
                      <>
                        <Menu as="div" className="relative">
                          <div>
                            <Menu.Button className="flex dark:text-white text-gray-900">
                              <span className="sr-only">Open auth menu</span>
                              <span className="flex justify-center align-items-center border rounded-full overflow-hidden relative h-10 w-10">
                                <UserIcon className="text-gray-800 h-8 w-8 top-2 absolute" />
                              </span>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to="/"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-4 text-sm text-gray-700",
                                    )}
                                  >
                                    Register
                                  </NavLink>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to="/login"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-4 text-sm text-gray-700",
                                    )}
                                  >
                                    Signin
                                  </NavLink>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    </li>
                  </ul>
                </div>
                <hr className="border-[1px] border-gray-900/40" />
                <div className="relative flex items-center justify-between py-2 h-20">
                  <div>
                    <MagnifyingGlassIcon
                      className="cursor-pointer h-8 w-8 text-gray-800"
                      onClick={() => {}}
                    />
                  </div>

                  <div className="hidden sm:ml-4 lg:block">
                    <div className="flex items-center space-x-10">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={handleActive}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 lg:mr-0">
                    <BellIcon className="h-8 w-8 relative before:absolute before:content-[''] before:h-4 before:w-4 before:rounded-full before:bg-red-600 before:top-2" />
                    <button
                      className="h-10 w-10 flex items-center justify-center rounded-full"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="sr-only">cart button</span>
                      <svg
                        width="20"
                        height="23"
                        viewBox="0 0 20 23"
                        fill="none"
                        className="h-8"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.996 21.3401L18.324 5.41707C18.3069 5.25626 18.231 5.10744 18.1108 4.99925C17.9907 4.89106 17.8347 4.83116 17.673 4.83107H14.53V4.11407C14.5065 3.05553 14.0694 2.04826 13.3125 1.30794C12.5555 0.567616 11.5388 0.153076 10.48 0.153076C9.42118 0.153076 8.40445 0.567616 7.6475 1.30794C6.89054 2.04826 6.45351 3.05553 6.42998 4.11407V4.83107H3.28498C3.12328 4.83116 2.96731 4.89106 2.84713 4.99925C2.72694 5.10744 2.65102 5.25626 2.63398 5.41707L0.958984 21.3401C0.949436 21.4315 0.959257 21.524 0.987807 21.6114C1.01636 21.6988 1.063 21.7793 1.12469 21.8475C1.18638 21.9157 1.26175 21.9701 1.34588 22.0073C1.43001 22.0444 1.52102 22.0634 1.61298 22.0631H19.345C19.4367 22.063 19.5274 22.0437 19.6111 22.0063C19.6949 21.969 19.7699 21.9145 19.8313 21.8464C19.8926 21.7782 19.939 21.6979 19.9674 21.6107C19.9958 21.5235 20.0055 21.4313 19.996 21.3401ZM7.73798 4.11407C7.73798 3.38698 8.02682 2.68967 8.54095 2.17554C9.05508 1.66141 9.75239 1.37257 10.4795 1.37257C11.2066 1.37257 11.9039 1.66141 12.418 2.17554C12.9321 2.68967 13.221 3.38698 13.221 4.11407V4.83107H7.73798V4.11407ZM2.33798 20.7541L3.87498 6.14007H6.42798V7.58307C6.42798 7.75679 6.49699 7.92339 6.61983 8.04623C6.74267 8.16906 6.90927 8.23807 7.08298 8.23807C7.2567 8.23807 7.4233 8.16906 7.54614 8.04623C7.66898 7.92339 7.73798 7.75679 7.73798 7.58307V6.14007H13.221V7.58307C13.221 7.75679 13.29 7.92339 13.4128 8.04623C13.5357 8.16906 13.7023 8.23807 13.876 8.23807C14.0497 8.23807 14.2163 8.16906 14.3391 8.04623C14.462 7.92339 14.531 7.75679 14.531 7.58307V6.14007H17.084L18.619 20.7541H2.33798Z"
                          fill="#222222"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center lg:hidden">
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-1.5 dark:text-white text-gray-900 bg-gray-50 hover:dark:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black/20">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden bg-white">
              <div className="space-y-3 px-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={handleActive}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="max-w-7xl mx-auto mt-36">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;

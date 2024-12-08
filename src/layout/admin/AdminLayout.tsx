import { Disclosure } from "@headlessui/react";
import { Fragment } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import {
  PlusCircleIcon,
  PowerIcon,
  ServerStackIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { AdminNavigationComponent } from "../../components/navigation/AdminNavigation";
import { NavItem } from "../../components/NavItem";
import { clx } from "../../util";
import { useLogoutMutation } from "../../features/auth/auth.slice";
import { toast } from "react-toastify";
import { classNames } from "../../helpers";

const AdminLayoutComponent = () => {
  return (
    <Disclosure as="div">
      {({ open, close }) => {
        return (
          <Fragment>
            <AdminNavigationComponent open={open} />
            <Outlet context={{ close }} />
          </Fragment>
        );
      }}
    </Disclosure>
  );
};

const routes = [
  {
    to: "/admin/overview",
    label: "overview",
    Icon: Squares2X2Icon,
    current: true,
  },
  {
    to: "/admin/orders",
    label: "orders",
    Icon: ShoppingCartIcon,
    current: true,
  },
  {
    to: "/admin/products/all",
    label: "products",
    Icon: ServerStackIcon,
    current: true,
  },
  {
    to: "/admin/users",
    label: "users",
    Icon: UsersIcon,
    current: true,
  },
  {
    to: "/admin/products/create",
    label: "new product",
    Icon: PlusCircleIcon,
    current: true,
  },
];

interface OutletContext {
  close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null>) => void;
}

export const AdminDashboardLayout = () => {
  const context = useOutletContext<OutletContext>();
  const [logout] = useLogoutMutation();

  return (
    <div className="flex items-stretch justify-between flex-shrink-0">
      <nav className="hidden lg:block fixed left-0 w-80 bg-white h-[calc(100vh-5rem)] top-20 border-r">
        <div className="flex flex-col items-center w-full">
          {routes.map(({ label, Icon, to, current }) => (
            <NavItem
              to={to}
              key={label}
              aria-current={current ? "page" : undefined}
              className={clx(current ? "hover:bg-[#F8F8F8]" : "", "py-5 px-10 w-full transition")}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={clx(isActive ? "stroke-[#5932EA]" : "stroke-[#7B7B7B]", "h-6")}
                  />
                  <span
                    className={clx(
                      "text-base sm:text-lg font-roboto capitalize",
                      isActive ? "text-[#5932EA] font-medium" : "text-[#0C0C0D] font-normal",
                    )}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavItem>
          ))}
          <button
            type="button"
            onClick={async () => {
              await logout()
                .unwrap()
                .then((response) => {
                  toast.success(response?.message);
                  return <Navigate to="/logout" replace />;
                })
                .catch((error: any) => {
                  toast.error(error?.error || error?.data?.message);
                });
            }}
            className={classNames(
              "hover:bg-gray-100",
              "flex w-full items-center gap-4 py-5 px-10 ",
            )}
          >
            <PowerIcon className="h-6 stroke-red-500" />

            <span className="text-base sm:text-lg capitalize">Log Out</span>
          </button>
        </div>
      </nav>

      <Disclosure.Panel className="fixed z-10  transition-all lg:hidden left-0 right-0 w-full  bg-white top-20 border-r">
        <div className="">
          <div className="flex flex-col items-center w-full">
            {routes.map(({ label, Icon, to, current }) => (
              <NavItem
                to={to}
                key={label}
                aria-current={current ? "page" : undefined}
                className={clx(current ? "hover:bg-[#F8F8F8]" : "", "py-5 px-10 w-full transition")}
                close={context.close}
                onClick={async () => {
                  label === "logout" &&
                    (await logout()
                      .unwrap()
                      .then((response) => {
                        toast.success(response?.message);
                        return <Navigate to="/admin/logout" replace />;
                      })
                      .catch((error: any) => {
                        toast.error(error?.error || error?.data?.message);
                      }));
                }}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={clx(isActive ? "stroke-[#5932EA]" : "stroke-[#7B7B7B]", "h-6")}
                    />
                    <span
                      className={clx(
                        "text-base sm:text-lg font-roboto capitalize",
                        isActive ? "text-[#5932EA] font-medium" : "text-[#0C0C0D] font-normal",
                      )}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavItem>
            ))}
            <button
              type="button"
              onClick={async () => {
                await logout()
                  .unwrap()
                  .then((response) => {
                    toast.success(response?.message);
                    return <Navigate to="/logout" replace />;
                  })
                  .catch((error: any) => {
                    toast.error(error?.error || error?.data?.message);
                  });
              }}
              className={classNames(
                "hover:bg-gray-100",
                "flex w-full items-center gap-4 py-5 px-10 transition",
              )}
            >
              <PowerIcon className="h-6 stroke-red-500" />

              <span className="text-base sm:text-lg capitalize">Log Out</span>
            </button>
          </div>
        </div>
      </Disclosure.Panel>

      <main className="absolute left-0 lg:left-80 w-full lg:w-[calc(100%-20rem)] pt-20">
        <div className="px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayoutComponent;

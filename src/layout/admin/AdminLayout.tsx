import { Disclosure } from "@headlessui/react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { AdminNavigationComponent } from "../../components/navigation/AdminNavigation";
import { NavItem } from "../../components/NavItem";
import { PlusCircleIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { clx } from "../../util";

const AdminLayoutComponent = () => {
  return (
    <Disclosure as="div" className="flex items-stretch justify-between flex-shrink-0 bg-gray-100">
      {({ open }) => {
        return (
          <Fragment>
            <AdminNavigationComponent open={open} />
            <Outlet />
          </Fragment>
        );
      }}
    </Disclosure>
  );
};

const routes = [
  {
    to: "/admin/product/overview",
    label: "overview",
    Icon: Squares2X2Icon,
    current: true,
  },
  {
    to: "/admin/product/create",
    label: "new product",
    Icon: PlusCircleIcon,
    current: true,
  },
];

export const AdminDashboardLayout = () => {
  return (
    <div className="flex items-stretch justify-between flex-shrink-0">
      <nav className="hidden lg:block fixed left-0 w-80 bg-white h-[calc(100vh-5rem)] top-20 border-r">
        <div className="">
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
          </div>
        </div>
      </nav>

      <nav className="fixed lg:hidden left-0 w-80 bg-white h-screen top-0 border-r">
        <div className=""></div>
      </nav>

      <main className="absolute left-0 lg:left-80 w-full lg:w-[calc(100%-20rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayoutComponent;

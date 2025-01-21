import { Disclosure } from "@headlessui/react";
import { SettingsPanel } from "../../components/panels/SettingsPanel";
import { Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <Disclosure as="div" className="relative flex items-stretch justify-between flex-shrink-0">
      <SettingsPanel />

      <main className="w-full absolute justify-between left-0 right-0 lg:left-[24rem] lg:w-[calc(100%-24rem)] px-4 xl:px-0 xl:pl-4">
        <Outlet />
      </main>
    </Disclosure>
  );
}

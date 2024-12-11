import { Switch } from "@headlessui/react";
import { clx } from "../../util";

export default function StatusSwitch({
  enabled,
  setEnabled,
  bgClass = "",
}: {
  enabled: boolean;
  bgClass?: string;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      aria-label="Enable click"
      className={clx(
        bgClass,
        "group relative flex h-6 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-6"
      />
    </Switch>
  );
}

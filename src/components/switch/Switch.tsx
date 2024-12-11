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
        "group relative flex h-6 w-12  cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white",
      )}
    >
      <span
        aria-hidden="true"
        className={clx(
          "pointer-events-none inline-block size-6 scale-[.70] rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out",
          enabled ? " translate-x-[1.45rem]": "translate-x-0",
        )}
      />
    </Switch>
  );
}

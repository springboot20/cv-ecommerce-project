import { Outlet } from "react-router";
import { DesktopNavigation } from "../components/desktop-navigation/DesktopNavigation";
import { MobileNavigation } from "../components/mobile-navigation/MobileNavigation";
import {
  CheckCircleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    title: "Your details",
    description: "please provide your details information",
    Icon: UserIcon,
  },
  {
    title: "Check your inbox",
    description: " Verify codes delivered to your inbox",
    Icon: EnvelopeIcon,
  },
  {
    title: "Choose a password",
    description: "Choose a secured password",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Successfully",
    description: "Go back to log in to your account",
    Icon: CheckCircleIcon,
  },
];

export default function RegisterLayout() {
  return (
    <div className="flex items-stretch flex-col lg:justify-between lg:flex-row flex-shrink-0 overflow-hidden bg-gray-100">
      <DesktopNavigation steps={steps} />
      <MobileNavigation steps={steps} />

      <div className="w-[calc(100%-28rem] flex-1 flex-shrink-0">
        <Outlet />
      </div>
    </div>
  );
}

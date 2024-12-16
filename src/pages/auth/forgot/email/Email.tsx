import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../../../hooks/redux/redux.hooks";
import { RootState } from "../../../../app/store";
import { FormEvent } from "react";
import { Button } from "@material-tailwind/react";
import { useForm } from "../../../../hooks/useForm";

export const Email = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { handlePrevStep } = useForm();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      
    } catch (error: any) {}
  };

  return (
    <div className="flex justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full">
      <div className="w-full max-w-xl">
          <div className="flex justify-center items-center flex-col">
            <span className="flex items-center justify-center border size-12 rounded-full bg-white">
              <EnvelopeIcon className="h-6 text-gray-600" strokeWidth={2} />
            </span>
            <h2 className="mt-2 text-xl text-center font-semibold text-gray-800">
              Check you inbox
            </h2>
            <p className="text-center flex items-center flex-col">
              <span>We sent a password reset link to</span>
              <span className="text-gray-600">{user?.email}</span>
            </p>
          </div>
          <form className="w-full flex flex-col h-auto mt-4" onSubmit={handleSubmit}>
            <Button
              type="submit"
              className="flex items-center justify-center bg-blue-500 text-white text-sm font-semibold rounded-3xl shadow-md hover:bg-blue-400 active:bg-blue-500 focus:ring-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 tracking-wider sm:mt-4 sm:py-2.5 disabled:bg-blue-400"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Verify email</span>
            </Button>

            <div className="flex items-center justify-center space-x-2 mt-2">
              <p className="text-[#475467] text-sm font-normal">Didn't recieve the email? </p>
              <Button
                variant="text"
                type="button"
                className="text-blue-500 font-medium p-0 hover:bg-transparent active:bg-transparent"
                placeholder={undefined}
                ripple={false}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Click to resend
              </Button>
            </div>

            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center justify-center space-x-2 mt-4"
            >
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9167 11H5.08337M5.08337 11L11.5 17.4167M5.08337 11L11.5 4.58334"
                  stroke="#475467"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-sm font-medium text-[#475467]">Back</span>
            </button>
          </form>
      </div>
    </div>
  );
};


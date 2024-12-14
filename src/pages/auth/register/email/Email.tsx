import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../../../hooks/redux/redux.hooks";
import { RootState } from "../../../../app/store";
import { FormEvent, useEffect, useState } from "react";
import { useOtp } from "../../../../hooks/useOtp";
import { Button } from "@material-tailwind/react";
import { useForm } from "../../../../hooks/useForm";
import { useVerifyEmailMutation } from "../../../../features/auth/auth.slice";
import { toast } from "react-toastify";

export const Email = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [expiresIn, setExpiresIn] = useState<number>(200);
  const { handlePrevStep, handleNextStep } = useForm();
  const [verifyEmail] = useVerifyEmailMutation();
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  useEffect(() => {
    if (expiresIn > 0) {
      const expireTime = setInterval(() => {
        setExpiresIn((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(expireTime);
      };
    }
  }, [expiresIn]);

  const { values, handleChange, handleKeyDown, handlePaste, formatTime, inputRefs } = useOtp();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const response = await verifyEmail({
        email: user?.email as string,
        token: values.join(""),
      }).unwrap();

      if (response.statusCode.toString().startsWith("2")) {
        setIsEmailVerified(true);
        toast.success(response.data.message);
        await Promise.resolve(setTimeout(() => handleNextStep(), 1500));
      }
      console.log(values);
    } catch (error: any) {
      setIsEmailVerified(false);

      if ([404, 401, 500].includes(error?.statusCode)) {
        await Promise.resolve(
          setTimeout(() => {
            handlePrevStep();
          }, 1500),
        );
      }
      const errorMessage =
        error.error ||
        (error.data && typeof error.data.message === "string"
          ? error.data.message
          : JSON.stringify(error.data?.message));
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full">
      <div className="w-full sm:w-fit">
        {isEmailVerified ? (
          <EmailVerified />
        ) : (
          <>
            <div className="sm:mx-auto sm:w-full sm:max-w-xl flex justify-center items-center flex-col">
              <span className="flex items-center justify-center border size-12 rounded-full bg-white">
                <EnvelopeIcon className="h-6 text-gray-600" strokeWidth={2} />
              </span>
              <h2 className="mt-2 text-xl text-center font-semibold text-gray-800">
                Check you inbox
              </h2>
              <p className="text-center flex items-center flex-col">
                <span>We sent verification codes to</span>
                <span className="text-gray-600">{user?.email}</span>
              </p>
            </div>
            <form className="w-full flex flex-col h-auto mt-4" onSubmit={handleSubmit}>
              <div className="flex items-center justify-between w-full sm:space-x-2">
                {values.map((v, index) => (
                  <fieldset key={index}>
                    <label htmlFor="number" className="hidden sr-only">
                      {index}
                    </label>
                    <input
                      id="number"
                      type="text"
                      value={v}
                      maxLength={1}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="\d{1}"
                      disabled={expiresIn === 0}
                      onChange={(event) => handleChange(event.target.value, index)}
                      onKeyUp={(event) => handleKeyDown(event, index)}
                      ref={(el) => el && (inputRefs.current[index] = el)}
                      onPaste={handlePaste}
                      className="block h-12 w-12 xs:h-16 xs:w-16 md:h-12 md:w-12 text-center appearance-none px-3 text font-medium rounded-md border-0 py-3 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-lg sm:leading-6 outline-none"
                    />
                  </fieldset>
                ))}
              </div>

              <div className="mt-2 text-gray-700">
                {expiresIn > 0 ? (
                  <span>Expires in : {formatTime(expiresIn)} seconds</span>
                ) : (
                  <span className="text-red-500 text-right block">
                    {formatTime(expiresIn)} expires
                  </span>
                )}
              </div>

              <Button
                type="submit"
                loading={expiresIn === 0}
                disabled={expiresIn === 0}
                className="flex items-center justify-center bg-blue-500 text-white text-sm font-semibold rounded-md transform hover:-translate-y-1.5 transition shadow-md hover:bg-blue-400 active:bg-blue-500 focus:ring-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 tracking-wider sm:mt-4 sm:py-2.5 disabled:bg-blue-400 disabled:hover:translate-y-0"
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
          </>
        )}
      </div>
    </div>
  );
};

const EmailVerified = () => {
  const { handleNextStep } = useForm();

  return (
    <>
      <div className="w-full sm:w-fit">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl flex justify-center items-center flex-col">
          <span className="flex items-center justify-center border size-12 rounded-full bg-white">
            <EnvelopeIcon className="h-6 text-gray-600" strokeWidth={2} />
          </span>
          <h2 className="mt-2 text-xl text-center font-medium text-[#667085]">Email verified</h2>
          <p className="text-center text-[#667085] text-lg">
            Your email has been verified. Click <br /> below to next step
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <button
          type="button"
          onClick={() => {
            setTimeout(() => handleNextStep(), 1500);
          }}
          className="rounded-md w-full bg-light-blue-600 px-3 py-2 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
        >
          Continue
        </button>
      </div>
    </>
  );
};

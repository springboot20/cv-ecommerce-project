import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../../../hooks/redux/redux.hooks";
import { RootState } from "../../../../app/store";
import { FormEvent, useEffect, useState } from "react";
import { useOtp } from "../../../../hooks/useOtp";
import { Button } from "@material-tailwind/react";

export const Email = () => {
  const { admin } = useAppSelector((state: RootState) => state.auth);
  const [expiresIn, setExpiresIn] = useState<number>(200);

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

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log(values);
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] lg:min-h-screen justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full">
      <div className="w-full sm:w-fit">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl flex justify-center items-center flex-col">
          <span className="flex items-center justify-center border size-12 rounded-full bg-white">
            <EnvelopeIcon className="h-6 text-gray-600" strokeWidth={2} />
          </span>
          <h2 className="mt-2 text-xl text-center font-semibold text-gray-800">Check you inbox</h2>
          <p className="text-center flex items-center flex-col">
            <span>We sent verification codes to</span>
            <span className="text-gray-600">{admin?.email}</span>
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
        </form>
      </div>
    </div>
  );
};

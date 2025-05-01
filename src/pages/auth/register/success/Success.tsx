import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../hooks/redux/redux.hooks";
import { RootState } from "../../../../app/store";
import { useForm } from "../../../../hooks/useForm";

export const Success: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setPage }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { setCurrentStep } = useForm();

  return (
    <div className="flex justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full">
      <div className="w-full sm:w-fit">
        <div className=" flex justify-center items-center flex-col">
          <span className="flex items-center justify-center border size-12 rounded-full bg-white">
            <CheckIcon className="h-6 text-gray-600" strokeWidth={2} />
          </span>
          <h2 className="mt-2 text-xl text-center font-semibold text-[#101828]">Successfully</h2>
          <p className="text-center text-[#667085]">Your account has been successfully create</p>
          <p className="text-center text-[#667085]">Click below to log in magically.</p>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            onClick={() => {
              setTimeout(() => {
                if (user?.role === "ADMIN" || user?.role === "MODERATOR") {
                  navigate("/admin/login");
                } else {
                  navigate("/login");
                }
              }, 1500);
              setCurrentStep(0);
              setPage("details")
            }}
            className="rounded-3xl w-full bg-light-blue-600 px-3 py-2 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
          >
            Continue to login
          </button>
        </div>
      </div>
    </div>
  );
};

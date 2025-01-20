import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const EmailVerificationSuccessMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center flex-col max-w-xl text-center bg-white p-6 shadow-sm rounded-2xl border">
        <h1 className="text-xl font-semibold text-gray-800 capitalize">account verified</h1>

        <div>
          <span className="flex items-center justify-center">
            <EnvelopeIcon className="h-20 fill-green-600 stroke-white" aria-hidden={true} />
          </span>
        </div>


        <div className="space-y-5">
          
          <p className="text-gray-700 text-xl">
            Thank you, your email has been verified. Your account is now active, Please use the link
            below to login to your account
          </p>

          <button
            onClick={async () => {
              await Promise.resolve(setTimeout(() => navigate("/login"), 2000));
            }}
            className="py-2.5 px-4 rounded-md capitalize bg-gray-800 focus:outline-none text-white mt-2"
          >
            login in to your account
          </button>
        </div>
      </div>
    </div>
  );
};

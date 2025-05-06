import React from "react";
import { useCreatePaystackOrderMutation } from "../../features/order/order.slice";
import { toast } from "react-toastify";
import { clx } from "../../util";

const PayButton: React.FC = () => {
  const [createPaystackOrder, { isLoading }] = useCreatePaystackOrderMutation();

  const initializePayment = async () => {
    await createPaystackOrder()
      .unwrap()
      .then((response) => {
        const { url } = response.data;

        // Open Paystack payment page in a new tab
        const paymentWindow = window.open(url);

        if (paymentWindow) {
          const interval = setInterval(() => {
            if (paymentWindow.closed) {
              toast(response?.message, { type: "success" });
              clearInterval(interval);
            }
          }, 1000);
        } else {
          console.error("Failed to open payment window.");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <button
      type="button"
      onClick={initializePayment}
      disabled={isLoading}
      className={clx(
        "disabled:ring-gray-200 disabled:pointer-events-none disabled:text-white disabled:bg-indigo-500/50 disabled:ring-1 text-base capitalize font-medium border-none ring-2 w-full ring-gray-200 rounded-md py-2.5 px-6 text-white bg-indigo-500",
        isLoading ? "flex gap-2 items-center justify-center cursor-not-allowed" : "text-center"
      )}
    >
      {isLoading ? (
        <>
          <span>Generating paystack payment...</span>
          <svg className="h-8 w-8 animate-spin" viewBox="3 3 18 18">
            <path
              className="fill-gray-300"
              d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
            ></path>
            <path
              className="fill-indigo-500"
              d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
            ></path>
          </svg>
        </>
      ) : (
        "Confirm order | Pay with Paystack"
      )}
    </button>
  );
};

export default PayButton;

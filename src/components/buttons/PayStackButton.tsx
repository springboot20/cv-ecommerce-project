import React from "react";
import { Loader } from "../Loader";
import { useCreatePaystackOrderMutation } from "../../features/order/order.slice";

const PayButton: React.FC = () => {
  const [createPaystackOrder, { isLoading }] = useCreatePaystackOrderMutation();

  const initializePayment = async () => {
    createPaystackOrder()
      .unwrap()
      .then((response) => {
        const { url } = response.data;

        console.log(response);

        // Open Paystack payment page in a new tab
        const paymentWindow = window.open(url);

        if (paymentWindow) {
          const interval = setInterval(() => {
            if (paymentWindow.closed) {
              window.location.href = "/checkout-success";
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

  return isLoading ? (
    <Loader />
  ) : (
    <button
      type="button"
      onClick={initializePayment}
      className="text-base font-medium text-white py-2.5 px-2 rounded bg-gray-800 hover:bg-gray-600 w-full block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      "Confirm order | Pay with Paystack"
    </button>
  );
};

export default PayButton;

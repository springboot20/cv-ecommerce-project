import React from "react";
import { Loader } from "../Loader";
import {
  useCreatePaystackOrderMutation,
  useVerifyPaystackOrderMutation,
} from "../../features/order/order.slice";

const PayButton: React.FC<{ requestData: { addressId: string; email: string } }> = ({
  requestData,
}) => {
  const [createPaystackOrder, { isLoading }] = useCreatePaystackOrderMutation();
  const [verifyPaystackOrder] = useVerifyPaystackOrderMutation();

  const initializePayment = async () => {
    try {
      // Send a POST request to your server to create a Paystack checkout session
      const response = await createPaystackOrder({ ...requestData }).unwrap();

      const { authorizationUrl } = response.data;

      // Open Paystack payment page in a new tab
      const paymentWindow = window.open(authorizationUrl);

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

    } catch (error) {
      console.error("Error initializing payment:", error);
      // Handle the error, e.g., show a user-friendly error message to the user.
    }
  };

  return (
    <button
      type="button"
      onClick={initializePayment}
      className="text-base font-medium text-white py-2.5 px-2 rounded bg-gray-800 hover:bg-gray-600 w-full block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      {isLoading ? <Loader /> : "Confirm order | Pay with Paystack"}
    </button>
  );
};

export default PayButton;

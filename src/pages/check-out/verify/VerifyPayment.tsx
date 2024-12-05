import { useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../../hooks/redux/redux.hooks";
import { RootState } from "../../../app/store";

let env = import.meta.env;

let base_url = env.MODE === "development" ? env.VITE_API_BASE_URL_DEV : env.VITE_API_BASE_URL_PROD;

const verifyPaystackPayment = async (trxref: string, reference: string, access_token: string) => {
  try {
    const response = await axios.get(`${base_url}/orders/provider/paystack/verify-callback`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        trxref,
        reference,
      },
    });

    console.log(response);
  } catch (error: any) {}
};

export default function VerifyPaystackPayment() {
  const { tokens } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trxref = urlParams.get("trxref");
    const reference = urlParams.get("reference");

    if (trxref && reference) {
      verifyPaystackPayment(trxref, reference, tokens?.access_token!);
    }
  }, []);

  return <div className=""></div>;
}

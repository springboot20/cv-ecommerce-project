import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../../hooks/redux/redux.hooks';
import { RootState } from '../../../app/store';
import PaymentSuccessModal from '../../../components/modal/PaymentSuccessfulModal';
import { OrderResponse } from '../../../types/redux/order';

const env = import.meta.env;

const base_url =
  env.MODE === 'development' ? env.VITE_API_BASE_URL_DEV : env.VITE_API_BASE_URL_PROD;

export default function VerifyPaystackPayment() {
  const { tokens } = useAppSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<OrderResponse>({} as OrderResponse);

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

      if (response.status) {
        setData(response.data);
        setIsOpen(true);
      }
    } catch (error: any) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trxref = urlParams.get('trxref');
    const reference = urlParams.get('reference');

    if (trxref && reference) {
      verifyPaystackPayment(trxref, reference, tokens?.access_token as string);
    }
  }, [tokens?.access_token]);

  return (
    <PaymentSuccessModal
      isOpen={isOpen}
      onClose={() => {
        setTimeout(() => {
          setIsOpen(false);
        }, 500);
      }}
      data={data.data}
    />
  );
}

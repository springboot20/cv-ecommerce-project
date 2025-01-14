import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { EmailVerificationSuccessMessage } from '../messages/EmailMessage';
import { useAppSelector } from '../../../hooks/redux/redux.hooks';
import { RootState } from '../../../app/store';

const env = import.meta.env;
const base_url =
  env.MODE === 'development' ? env.VITE_API_BASE_URL_DEV : env.VITE_API_BASE_URL_PROD;

const EmailVerification = () => {
  const [status, setStatus] = useState<'success' | 'failed' | undefined>('success');
  const { tokens } = useAppSelector((state: RootState) => state.auth);

  const verify = useCallback(
    async (id: string, token: string) => {
      await axios.post(
        `${base_url}`,
        {
          headers: {
            Authorization: `Bearer ${tokens?.access_token}`,
          },
        },
        {
          params: {
            id,
            token,
          },
        }
      );

      setStatus('success');
    },
    [tokens?.access_token]
  );

  useEffect(() => {
    const urlSearcParams = new URLSearchParams(window.location.search);

    const id = urlSearcParams.get('id');
    const token = urlSearcParams.get('token');

    if (id && token) {
      verify(id, token);
    }
  }, [verify]);

  if (status === 'success') {
    return <EmailVerificationSuccessMessage />;
  } else return null;
};

export default EmailVerification;

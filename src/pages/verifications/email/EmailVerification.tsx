import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EmailVerificationSuccessMessage } from "../messages/EmailMessage";
import { useAppSelector } from "../../../hooks/redux/redux.hooks";
import { RootState } from "../../../app/store";

const env = import.meta.env;
let base_url = env.MODE === "development" ? env.VITE_API_BASE_URL_DEV : env.VITE_API_BASE_URL_PROD;

const EmailVerification = () => {
  const [status, setStatus] = useState<"success" | "failed" | undefined>("success");
  const { tokens } = useAppSelector((state: RootState) => state.auth);

  const verify = async (id: string, token: string) => {
    try {
      const { data } = await axios.post(
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
        },
      );

      setStatus("success");
      toast.success(data.message, { autoClose: 2000 });
    } catch (error) {
      if (status !== "success") {
        // Only show error if status is not already "success"
        setStatus("failed");
        if (error instanceof AxiosError) {
          const { message } = error.response?.data;
          toast.error(message, { autoClose: 2000 });
        }
      }
    }
  };

  useEffect(() => {
    const urlSearcParams = new URLSearchParams(window.location.search);

    const id = urlSearcParams.get("id");
    const token = urlSearcParams.get("token");

    if (id && token) {
      verify(id, token);
    }
  }, []);

  if (status === "success") {
    return <EmailVerificationSuccessMessage />;
  } else return null;
};

export default EmailVerification
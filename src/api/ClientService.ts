import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

export const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/',
});

interface ClientServiceProps extends AxiosRequestConfig {
  showSuccessNotification?: boolean;
}

export const clientService = async ({
  showSuccessNotification = true,
  ...options
}: ClientServiceProps) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status.toString().startsWith('2')) {
        showSuccessNotification ? toast.success(response.data.message) : '';
      }

      return response;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        const errorMsg = (error.response?.data as { error?: string })?.error;
        const errorWithMsg = (error.response?.data as { message?: string })?.message;
        if (errorMsg) {
          toast.error(errorMsg);
        } else if (errorWithMsg) {
          toast.error(errorWithMsg);
        }
      } else {
        toast.error(error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance({ ...options });
};

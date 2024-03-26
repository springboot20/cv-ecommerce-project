import { AxiosResponse } from 'axios';
import { ToastOptions } from 'react-toastify';

export interface ApiResponseObj {
  api: () => Promise<AxiosResponse<ApiSuccessResponseObj, any>>;
  setLoading: ((loading: boolean) => void) | null;
  onSuccess: (
    data: ApiSuccessResponseObj,
    message: string,
    toast: (content: React.ReactNode, options?: ToastOptions) => React.ReactText
  ) => void;
  onError: (
    error: string,
    toast: (content: React.ReactNode, options?: ToastOptions) => React.ReactText
  ) => void;
}

export interface ApiSuccessResponseObj {
  data: any;
  statusCode: number;
  message: string;
  success: boolean;
}

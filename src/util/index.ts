import { ApiResponseObj } from "../types/api.types";
import { toast } from "react-toastify";

export const isBrowser = typeof window !== "undefined";

export const  clx = (...classnames: (string | boolean)[]) =>
  classnames?.filter(Boolean).join(' ');


export class LocalStorage {
  static get(key: string) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  static set(key: string, value: any) {
    if (!isBrowser) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}


export const apiRequestHandler = async ({
  api,
  setLoading,
  onSuccess,
  onError,
}: ApiResponseObj) => {
  setLoading && setLoading(true);
  try {
    const response = await api();
    const { data } = response;

    onSuccess(data, data.message, toast);
  } catch (error: any) {
    onError(error.message, toast);
  } finally {
    setLoading && setLoading(false);
  }
};

import { ApiResponseObj } from '../types/api.types';
import { toast } from 'react-toastify';

export class LocalStorage {
  static get(key: string) {
    if (isBrowser) return;

    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  static set(key: string, value: any) {
    if (isBrowser) return;

    return localStorage.setItem(key, value);
  }

  static remove(key: string) {
    if (isBrowser) return;

    return localStorage.removeItems(key);
  }

  static clear(): void {
    if (isBrowser) return;

    return localStorage.clear();
  }
}

export const isBrowser = typeof window !== 'undefined';

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

/* eslint-disable react-refresh/only-export-components */

import axios from 'axios';
import { LocalStorage } from '../util';

export const AxiosApiClient = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',
  baseURL: 'https://cart-product-api.onrender.com/api/v1',
  timeout: 20000,
});

AxiosApiClient.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(LocalStorage.get('tokens'));
    const accessToken = tokens?.accessToken; // use optional chaining to avoid TypeError
    const refreshToken = tokens?.refreshToken; // use optional chaining to avoid TypeError;

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    if (refreshToken) config.headers['x-refresh'] = `Bearer ${refreshToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Sign endpoints
 */
export const registerUser = async (data: { username: string; email: string; password: string }) =>
  AxiosApiClient.post(' ', data);
export const loginUser = async (data: { username?: string; email?: string; password: string }) =>
  AxiosApiClient.post(' ', data);
export const logoutUser = async () => AxiosApiClient.post('', {});
export const getUserCart = async () => AxiosApiClient.get('');

/**
 * product endpoints
 */
export const getAllProducts = async () => AxiosApiClient.get('');
export const getProductsByCategory = async () => AxiosApiClient.get(' ');
export const getProduct = async (productId?: string) => AxiosApiClient.get(`/${productId}`);

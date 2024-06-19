import { AxiosResponse } from 'axios';
import { clientService } from './ClientService';

export default class AuthService {
  static async register(credentials: { [key: string]: string }) {
    const response = await clientService({
      method: 'POST',
      data: credentials,
      url: '/users',
    });

    console.log(response.status);
    console.log(response.data);

    if (response.status.toString().startsWith('2')) {
      localStorage.setItem('userData', response.data);
    }

    return response;
  }

  static async login(credentials: { email: string; password: string }) {
    try {
      const response = await clientService({
        method: 'POST',
        data: credentials,
        url: '/auth/login',
      });

      if (response.status.toString().startsWith('2')) {
        const token = response.data.access_token;
        console.log(response);

        localStorage.setItem('token', token);
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Propagate the error for further handling if needed
    }
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static logout(): undefined {
    localStorage.removeItem('token');
  }

  static async fetchUserProfile(id: string | number): Promise<AxiosResponse> {
    const response = await clientService({
      method: 'GET',
      url: `/users/${id}`,
    });

    if (response.status.toString().startsWith('2')) {
      const token = response.data.access_token;

      localStorage.setItem('token', token);
    }

    return response;
  }
}

import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '../src/state/storage';
import {useAuthStore} from '../src/state/authStore';

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {
      phone,
    });
    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', accessToken);
    const {setUser} = useAuthStore.getState();
    setUser(response.data.customer);
  } catch (er) {
    console.error('Caught an error while logging in: ', er);
  }
};

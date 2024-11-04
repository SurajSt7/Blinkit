import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '../src/state/storage';
import {useAuthStore} from '../src/state/authStore';
import {resetAndNaviagate} from '../src/utils/NavigationUtils';
import {appAxios} from './interceptor';

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {
      phone,
    });
    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', accessToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (er) {
    console.error('Caught an error while logging in: ', er);
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const {accessToken, refreshToken, deliveryPartner} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', accessToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (er) {}
};

export const refresh_Token = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;

    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);

    return new_access_token;
  } catch (er) {
    console.log('Caught an error while logging in: ', er);
    tokenStorage.clearAll();
    resetAndNaviagate('CustomerLogin');
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get(`/user`);
    setUser(response.data.user);
  } catch (er) {
    console.log('Login error: ', er);
  }
};

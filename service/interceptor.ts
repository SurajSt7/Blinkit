import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '../src/state/storage';
import {refresh_Token} from './authService';
import {Alert} from 'react-native';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('accesstoken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  async config => config,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_Token();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (er) {
        console.log('ERRROR REFRESHING TOKEN: ', er);
      }
    }
    if (error.response && error.response.status !== 401) {
      const errorMessage =
        error.response.data.message || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    }
    return Promise.resolve(error);
  },
);

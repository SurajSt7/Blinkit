import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../utils/Constants';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import Logo from '../../assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '../../state/authStore';
import {tokenStorage} from '../../state/storage';
import {resetAndNaviagate} from '../../utils/NavigationUtils';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refresh_Token} from '../../../service/authService';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

type DecodeToken = {
  expiry: number;
};

const SplashScreen: React.FC = () => {
  const {setUser, user} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodeToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodeToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.expiry < currentTime) {
        resetAndNaviagate('CustomerLogin');
        Alert.alert('Session Expired', 'Please login again');
        return false;
      }

      if (decodedAccessToken.expiry < currentTime) {
        try {
          refresh_Token();
          await refetchUser(setUser);
        } catch (er) {
          console.error('Caught an error while refetching the toke: ', er);
        }
      }
      if (user?.role === 'Customer') {
        resetAndNaviagate('ProductDashboard');
      } else {
        resetAndNaviagate('DeliveryDashboard');
      }
      return true;
    }
    resetAndNaviagate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        GeoLocation.requestAuthorization();
        tokenCheck();
      } catch (er) {
        Alert.alert(
          'Sorry we need location services to give you better shopping experience',
        );
      }
    };
    const timeoutId = setTimeout(() => {
      fetchUser();
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

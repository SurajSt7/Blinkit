import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../features/auth/SplashScreen';
import {navigationRef} from '../utils/NavigationUtils';
import DeliveryLogin from '../features/auth/DeliveryLoginPortal';
import CustomerLogin from '../features/auth/CustomerLogin';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="DeliveryLogin"
          component={DeliveryLogin}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{animation: 'fade'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
import React, {useState} from 'react';
import {deliveryLogin} from '../../../service/authService';
import {resetAndNaviagate} from '../../utils/NavigationUtils';
import {Alert} from 'react-native';
import CustomAreaView from '../../components/global/CustomSafeAreaView';
import CustomText from '../../components/ui/CustomText';

const DeliveryDashboard: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNaviagate('DeliveryDashboard');
    } catch (er) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomAreaView>
      <CustomText>Delivery Dashboard</CustomText>
    </CustomAreaView>
  );
};

export default DeliveryDashboard;

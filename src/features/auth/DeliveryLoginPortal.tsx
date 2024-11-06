import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import CustomAreaView from '../../components/global/CustomSafeAreaView';
import CustomText from '../../components/ui/CustomText';
import {screenHeight} from '../../utils/Scaling';
import LottieView from 'lottie-react-native';
import {Fonts} from '../../utils/Constants';
import CustomInput from '../../components/ui/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/ui/CustomButton';
import {deliveryLogin} from '../../../service/authService';
import {resetAndNaviagate} from '../../utils/NavigationUtils';

const DeliveryLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await deliveryLogin(email.toLowerCase(), password);
      if (result) {
        resetAndNaviagate('DeliveryDashboard');
      } else {
        setLoading(false);
        Alert.alert(
          'Login Failed',
          'Please ensure the entered email and password are correct',
          [
            {
              text: 'OK',
              style: 'destructive',
              onPress: () => {},
            },
            {
              text: 'Cancel',
              style: 'destructive',
              onPress: () => {},
            },
          ],
        );
      }
    } catch (er) {
      console.log('Login failed: ', er);
      Alert.alert('Login Failed');
    }
  };

  return (
    <CustomAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              loop
              autoPlay
              style={styles.lottie}
              source={require('../../assets/animations/delivery_man.json')}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Medium}>
            Faster than Flash⚡️
          </CustomText>
          <CustomInput
            value={email}
            onChangeText={txt => {
              setEmail(txt);
            }}
            left={
              <Icon
                size={26}
                style={{marginLeft: 10}}
                name="mail"
                color={'#f8890e'}
              />
            }
            right={false}
            placeholder="Email"
            inputMode="email"
          />
          <CustomInput
            value={password}
            onChangeText={txt => {
              setPassword(txt);
            }}
            left={
              <Icon
                size={26}
                style={{marginLeft: 10}}
                name="key-sharp"
                color={'#f8890e'}
              />
            }
            maxLength={12}
            right={false}
            secureTextEntry
            placeholder="Password"
            inputMode="email"
          />
          <CustomButton
            disbaled={email.length === 0 || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.18,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

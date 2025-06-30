import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {screenWidth} from '../../utils/Scaling';
import {Colors, Fonts} from '../../utils/Constants';
import LottieView from 'lottie-react-native';
import CustomText from '../../components/ui/CustomText';
import {useAuthStore} from '../../state/authStore';
import {replace} from '../../utils/NavigationUtils';

const OrderSuccess: React.FC = (props: any) => {
  const {route} = props;
  const {user} = useAuthStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace('LiveTracking');
      return () => clearTimeout(timeoutId);
    }, 2300);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomText
        variant="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlacedText}>
        Order Placed
      </CustomText>
      <View style={styles.deliverContainer}>
        <CustomText
          fontFamily={Fonts.SemiBold}
          variant="h4"
          style={styles.deliveryText}>
          Delivering to Home
        </CustomText>
      </View>
      <CustomText
        variant="h8"
        style={styles.addressText}
        fontFamily={Fonts.Medium}>
        {user?.address || ''}
      </CustomText>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlacedText: {
    opacity: 0.4,
  },
  deliverContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 4,
    borderColor: Colors.secondary,
  },
  deliveryText: {
    marginTop: 16,
    borderColor: Colors.secondary,
  },
  addressText: {
    opacity: 0.8,
    textAlign: 'center',
    width: '80%',
    marginTop: 8,
  },
});

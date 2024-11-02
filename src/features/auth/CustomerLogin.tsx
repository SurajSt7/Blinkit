import React, {useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView.tsx';
import ProductSlider from '../../components/login/ProductSlider.tsx';
import {resetAndNaviagate} from '../../utils/NavigationUtils.tsx';
import CustomText from '../../components/ui/CustomText.tsx';
import {Fonts} from '../../utils/Constants';
import CustomInput from '../../components/ui/CustomInput.tsx';

const CustomerLogin: React.FC = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGesture = ({nativeEvent}: PanGestureHandlerGestureEvent) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNaviagate('DeliveryLogin');
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.subContainer}
            keyboardDismissMode="on-drag">
            <View style={styles.content}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
              <CustomText variant="h2" fontFamily={Fonts.SemiBold}>
                Indis's last minute app
              </CustomText>
              <CustomText
                variant="h5"
                fontFamily={Fonts.Bold}
                style={styles.text}>
                Log in or sign up
              </CustomText>
              <CustomInput
                value={phone}
                placeholder="Enter your phone number"
                inputMode="numeric"
                onClear={() => setPhone('')}
                onChangeText={txt => {
                  setPhone(txt);
                }}
                maxLength={10}
                left={
                  <CustomText
                    variant="h6"
                    style={styles.phoneText}
                    fontFamily={Fonts.SemiBold}>
                    +91
                  </CustomText>
                }
              />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  subContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  text: {
    marginTop: 4,
    marginBottom: 20,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 12,
  },
});

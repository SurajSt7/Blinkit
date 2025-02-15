import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {darkWeatherColors} from '../../utils/Constants';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import LottieView from 'lottie-react-native';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';

const Visuals: React.FC = () => {
  const {scrollY} = useCollapsibleContext();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });
  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <LinearGradient colors={darkWeatherColors} style={styles.LG} />
      <Image
        source={require('../../assets/images/cloud.png')}
        style={styles.image}
      />
      <LottieView
        autoPlay
        enableMergePathsAndroidForKitKatAndAbove
        loop
        style={styles.lottie}
        source={require('../../assets/animations/raining.json')}
      />
    </Animated.View>
  );
};

export default Visuals;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  lottie: {
    width: '100%',
    height: 150,
    position: 'absolute',
    transform: [{scaleX: -1}],
  },
  LG: {
    width: '100%',
    height: screenHeight * 0.45,
    position: 'absolute',
  },
  image: {
    width: screenWidth,
    resizeMode: 'stretch',
    height: '100%',
  },
});

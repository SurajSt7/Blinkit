import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {darkWeatherColors} from '../../utils/Constants';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import LottieView from 'lottie-react-native';

const Visuals: React.FC = () => {
  return (
    <Animated.View style={[styles.container]}>
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
    // position: 'absolute',
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

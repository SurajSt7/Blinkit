import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {screenWidth} from '../../utils/Scaling';

const OrderSuccess: React.FC = () => {
  return (
    <View>
      <Text>OrderSuccess</Text>
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
  orderPlaced: {
    opacity: 0.4,
  },
  deliverContainer: {},
});

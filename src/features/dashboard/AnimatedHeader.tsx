import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import React from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Header from '../../components/dashboard/Header';

const AnimatedHeader: React.FC<{showNotice: () => void}> = ({showNotice}) => {
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });
  return (
    <Animated.View style={headerAnimatedStyles}>
      <Header
        showNotice={() => {
          showNotice();
        }}
      />
    </Animated.View>
  );
};

export default AnimatedHeader;

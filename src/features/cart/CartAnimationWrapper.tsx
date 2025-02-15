import {Animated} from 'react-native';
import {hocStyles} from '../../styles/GlobalStyles';
import {useEffect, useRef, useState} from 'react';

type CartAnimationProps = {
  cartcount: number;
  children: React.ReactNode;
};

const CartAnimationWrapper: React.FC<CartAnimationProps> = ({
  cartcount,
  children,
}) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (cartcount > 0 && !hasAnimated) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setHasAnimated(true));
    } else if (cartcount === 0 && hasAnimated) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start(() => setHasAnimated(false));
    }
  }, [cartcount, hasAnimated]);

  const slideUpStyle = {
    transform: [
      {
        translateY: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
    opacity: slideAnimation,
  };

  return (
    <>
      <Animated.View style={[hocStyles.cartContainer, slideUpStyle]}>
        {children}
      </Animated.View>
    </>
  );
};

export default CartAnimationWrapper;

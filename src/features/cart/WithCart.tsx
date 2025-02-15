import {StyleSheet, View} from 'react-native';
import {useCartStore} from '../../state/cartStore';
import CartAnimationWrapper from './CartAnimationWrapper';
import CartSummary from './CartSummary';

export const WithCart = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const WithCartComponent: React.FC<T> = props => {
    const cart = useCartStore(state => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        <CartAnimationWrapper cartcount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart![0]?.item?.image || null}
          />
        </CartAnimationWrapper>
      </View>
    );
  };
  return WithCartComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

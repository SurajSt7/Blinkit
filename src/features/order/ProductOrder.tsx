import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/ui/CustomHeader';
import {Colors, Fonts} from '../../utils/Constants';
import OrdersList from './OrdersList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '../../components/ui/CustomText';
import {useCartStore} from '../../state/cartStore';
import BillDetails from './BillDetails';
import {hocStyles} from '../../styles/GlobalStyles';
import {useAuthStore} from '../../state/authStore';
import ArrowButton from '../../components/ui/ArrowButton';
import {navigate} from '../../utils/NavigationUtils';
import {createOrder, getAllOrders} from '../../../service/orderService';

const ProductOrder: React.FC = () => {
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const {user, setCurrentOrder, currentOrder} = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);

  const totalItemPrice = getTotalPrice();

  const handleOrder = async () => {
    try {
      // if (currentOrder !== null) {
      //   console.log('current order: ', currentOrder);
      //   Alert.alert('Let your first order to be delivered');
      //   return;
      // }
      const formattedData = cart.map(item => ({
        id: item._id,
        item: item._id,
        count: item.count,
      }));
      if (!formattedData.length || formattedData.length === 0) {
        Alert.alert('Add some items to place order');
        return;
      }
      setLoading(true);
      const data = await createOrder(formattedData, totalItemPrice);
      console.log('first: ', data);
      if (data !== null) {
        setCurrentOrder(data);
        clearCart();
        navigate('OrderSuccess', {
          ...data,
        });
      } else {
        Alert.alert('There was an error');
      }
      setLoading(false);
    } catch (er) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const api = await getAllOrders();
        console.log('api data: ', api);
      } catch (er) {
        console.log('Caught an eror: ', er);
      }
    })();
  });

  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrdersList />
        <View style={styles.flexRowBet}>
          <View style={styles.flexRow}>
            <Image
              source={require('../../assets/icons/coupon.png')}
              alt="image"
              style={{width: 25, height: 25}}
            />
            <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>
        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRowBet}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}>
              Orders Cannot be cancelled once packed for delivery, In case of
              unexpected delays, a refund will be provided if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('../../assets/icons/home.png')}
                style={{width: 20, height: 20}}
              />
              <View style={{width: '75%'}}>
                <CustomText variant="h8" fontFamily={Fonts.Medium}>
                  Delivering to home
                </CustomText>
                <CustomText
                  variant="h9"
                  numberOfLines={2}
                  style={{opacity: 0.6}}>
                  {user?.address}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <CustomText
                variant="h8"
                style={{color: Colors.secondary}}
                fontFamily={Fonts.Medium}>
                Change
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentGateway}>
            <View style={{width: '30%'}}>
              <CustomText fontFamily={Fonts.Regular} fontSize={RFValue(6)}>
                💵 PAY USING
              </CustomText>
              <CustomText
                style={{marginTop: 2}}
                fontFamily={Fonts.Regular}
                variant="h9">
                Cash on Delivery
              </CustomText>
            </View>
            <View style={{width: '70%'}}>
              <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title={'Place Order'}
                onPress={handleOrder}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 12,
    paddingBottom: 250,
  },
  flexRowBet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  absoluteContainer: {
    marginVertical: 12,
    marginBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  addressContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  paymentGateway: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
  },
});

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthStore} from '../../state/authStore';
import {getOrderById} from '../../../service/orderService';
import {Colors} from '../../utils/Constants';
import LiveTrackingHeader from './LiveTrackingHeader';
import LiveMap from './LiveMap';

const LiveTracking: React.FC = () => {
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id);
    setCurrentOrder(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  let msg = 'Preparing your order';
  let time = 'Arriving in 10 mins';
  if (currentOrder?.status === 'Confirmed') {
    msg = 'Arriving Soon';
    time = 'Arriving in 8 minutes';
  } else if (currentOrder?.status === 'Arriving') {
    msg = 'Order Picked Up';
    time = 'Arriving in 6 minutes';
  } else if (currentOrder?.status === 'Delivered') {
    msg = 'Order Delivered';
    time = 'Fastest Delivery⚡️';
  }

  return (
    <View style={styles.container}>
      <LiveTrackingHeader type={'Customer'} title={msg} secondTitle={time} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LiveMap />
        <View style={styles.flexRow}></View>
      </ScrollView>
    </View>
  );
};

export default LiveTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    paddingBottom: 140,
    backgroundColor: Colors.secondary,
    padding: 16,
  },
  flexRow: {},
});

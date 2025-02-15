import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeader from '../../components/ui/CustomHeader';
import {Colors} from '../../utils/Constants';
import OrdersList from './OrdersList';

const ProductOrder: React.FC = () => {
  return (
    <View>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrdersList />
      </ScrollView>
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
});

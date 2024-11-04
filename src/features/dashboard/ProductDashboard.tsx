import {StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../../components/ui/CustomText';
import {useAuthStore} from '../../state/authStore';
import CustomAreaView from '../../components/global/CustomSafeAreaView';

const ProductDashboard: React.FC<any> = () => {
  const {user} = useAuthStore();
  return (
    <>
      <CustomAreaView>
        <CustomText>Product Dashboard</CustomText>
      </CustomAreaView>
    </>
  );
};

export default ProductDashboard;

const styles = StyleSheet.create({});

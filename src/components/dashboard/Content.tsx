import {StyleSheet, View} from 'react-native';
import React from 'react';
import AddCarousel from './AddCarousel';
import {adData, categories} from '../../utils/dummyData';
import CustomText from '../ui/CustomText';
import {Fonts} from '../../utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content: React.FC = () => {
  return (
    <View style={styles.container}>
      <AddCarousel addData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Bestsellers
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Home and Lifestyle
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: -16,
  },
});

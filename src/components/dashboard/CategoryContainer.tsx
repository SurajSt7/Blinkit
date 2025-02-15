import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScalePress from '../ui/ScalePress';
import {navigate} from '../../utils/NavigationUtils';
import CustomText from '../ui/CustomText';
import {Fonts} from '../../utils/Constants';

const CategoryContainer: React.FC<{data: any}> = ({data}) => {
  const renderItems = (items: any[]) => {
    return items.map((item: any, index: number) => {
      return (
        <ScalePress
          onPress={() => navigate('ProductCategories')}
          key={index}
          style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <CustomText
            variant="h8"
            style={styles.text}
            fontFamily={Fonts.Medium}>
            {item.name}
          </CustomText>
        </ScalePress>
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 25,
  },
  item: {
    width: '24%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#e5f3f3',
    marginBottom: 8,
  },
  image: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});

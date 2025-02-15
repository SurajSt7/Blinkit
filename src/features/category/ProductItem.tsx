import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {screenHeight} from '../../utils/Scaling';
import CustomText from '../../components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../utils/Constants';
import UniversalAdd from '../../components/ui/UniversalAdd';

const ProductItem: React.FC<{item: any; index: number}> = ({item, index}) => {
  const isSecondColumn = index % 2 != 0;

  return (
    <View
      style={[
        styles.container,
        {
          marginRight: isSecondColumn ? 12 : 0,
        },
      ]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Image
            source={require('../../assets/icons/clock.png')}
            style={[styles.clockIcon]}
          />
          <CustomText fontFamily={Fonts.Medium} fontSize={RFValue(6)}>
            8 mins
          </CustomText>
        </View>
        <CustomText
          numberOfLines={2}
          style={{marginVertical: 4}}
          fontFamily={Fonts.Medium}
          variant="h8">
          {item.name}
        </CustomText>
        <View style={styles.priceContainer}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              ₹{item?.price}
            </CustomText>
            <CustomText
              variant="h8"
              style={{opacity: 0.8, textDecorationLine: 'line-through'}}>
              ₹{item?.discountPrice}
            </CustomText>
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: 10,
    overflow: 'hidden',
    marginTop: 4,
  },
  imageContainer: {
    height: screenHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  image: {
    height: '100%',
    width: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  content: {flex: 1, paddingHorizontal: 12},
  flexRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: 'flex-start',
    gap: 4,
  },
  clockIcon: {
    height: 15,
    width: 15,
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginTop: 'auto',
  },
});

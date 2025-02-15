import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import CustomText from '../../components/ui/CustomText';
import UniversalAdd from '../../components/ui/UniversalAdd';

const OrderItem: React.FC<{item: any}> = ({item}) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image
          source={{uri: item?.item?.image}}
          alt="image"
          style={styles.img}
        />
      </View>
      <View style={{width: '55%'}}>
        <CustomText numberOfLines={2} fontFamily={Fonts.Medium} variant="h8">
          {item?.item?.name}
        </CustomText>
        <CustomText variant="h9">{item?.item?.quantity}</CustomText>
      </View>
      <View style={{width: '20%', alignItems: 'flex-end'}}>
        <UniversalAdd item={item.item} />
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={{alignSelf: 'flex-end', marginTop: 4}}>
          ₹{item?.count * item.item.price}
        </CustomText>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  img: {
    height: 40,
    width: 40,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 12,
    width: '17%',
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 0.6,
    borderTopColor: Colors.border,
  },
});

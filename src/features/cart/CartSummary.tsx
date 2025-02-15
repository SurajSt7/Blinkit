import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import {Colors, Fonts} from '../../utils/Constants';
import CustomText from '../../components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../utils/NavigationUtils';

type CartSummaryProps = {
  cartCount: number;
  cartImage: string;
};

const CartSummary: React.FC<CartSummaryProps> = ({cartCount, cartImage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRowGap}>
        <Image
          source={
            cartImage == null
              ? require('../../assets/icons/bucket.png')
              : {uri: cartImage}
          }
          style={styles.image}
        />
        <CustomText fontFamily={Fonts.SemiBold}>
          {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
        </CustomText>
        <Icon
          name="arrow-drop-up"
          color={Colors.secondary}
          size={RFValue(25)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigate('ProductOrder')}>
        <CustomText style={styles.btnText}>NEXT</CustomText>
        <Icon name="arrow-right" color={'#FFF'} size={RFValue(25)} />
      </TouchableOpacity>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.05,
    paddingBottom: screenWidth * 0.06,
    paddingTop: screenWidth * 0.02,
  },
  flexRowGap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: screenWidth * 0.03,
  },
  image: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: screenWidth * 0.025,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: screenHeight * 0.01,
    borderRadius: screenWidth * 0.025,
    backgroundColor: Colors.secondary,
    paddingHorizontal: screenWidth * 0.1,
  },
  btnText: {
    marginLeft: screenWidth * 0.02,
    color: '#fff',
  },
});

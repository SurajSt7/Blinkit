import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

type ArrowButtonType = {
  onPress: () => void;
  loading: boolean;
  title: string;
  price: number;
};

const ArrowButton: React.FC<ArrowButtonType> = props => {
  const {loading, onPress, price, title} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={loading}
      onPress={onPress}
      style={[
        styles.btn,
        {
          justifyContent: price !== 0 ? 'space-between' : 'center',
        },
      ]}>
      {price !== 0 && price && (
        <View>
          <CustomText
            variant="h7"
            style={{color: '#fff'}}
            fontFamily={Fonts.Medium}>
            ₹ {price + 34}.0
          </CustomText>
          <CustomText
            variant="h9"
            style={{color: '#fff'}}
            fontFamily={Fonts.Medium}>
            TOTAL
          </CustomText>
        </View>
      )}
      <View style={styles.flexRow}>
        <CustomText
          style={{color: '#fff'}}
          variant="h6"
          fontFamily={Fonts.Medium}>
          {title}
        </CustomText>
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={'#fff'}
            style={{marginHorizontal: 4}}
          />
        ) : (
          <Icon name="arrow-right" color={'#fff'} size={RFValue(25)} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ArrowButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

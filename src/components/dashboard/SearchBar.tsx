import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '../ui/CustomText';

const SearchBar: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Icon color={Colors.text} size={RFValue(20)} name="search" />
      <RollingBar
        interval={3000}
        defaultStyle={false}
        customStyle={styles.textContainer}>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "Sweets"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "milk"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "atta, dal, coke"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "chips"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "pooja equipments"
        </CustomText>
      </RollingBar>
      <View style={styles.divider} />
      <Icon name="mic" color={Colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginTop: 15,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  textContainer: {
    width: '90%',
    paddingLeft: 12,
    height: 50,
  },
});

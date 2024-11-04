import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../utils/Constants';
import CustomText from './CustomText';

type CustomButtonProps = {
  onPress?: () => void;
  title: string;
  disbaled?: boolean;
  loading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = props => {
  const {onPress, title, disbaled, loading} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disbaled}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {backgroundColor: disbaled ? Colors.disabled : Colors.secondary},
      ]}>
      {loading ? (
        <ActivityIndicator color={'#fff'} size={'small'} />
      ) : (
        <CustomText
          variant="h6"
          style={[styles.text]}
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 14,
    marginVertical: 14,
    width: '100%',
  },
  text: {
    color: '#ffff',
  },
});

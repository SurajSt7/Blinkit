import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';

type CustomInputProps = {
  onClear?: () => void;
  left?: React.ReactElement;
  right?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

const CustomInput: React.FC<
  CustomInputProps & React.ComponentProps<typeof TextInput>
> = props => {
  const {left, right = true, onClear, onChangeText, value, ...rest} = props;

  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        {...rest}
        placeholderTextColor={'#ccc'}
        style={styles.inputContainer}
        onChangeText={onChangeText}
        value={value}
      />
      <View style={styles.icon}>
        {value.length != 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Icon name="close-circle-sharp" size={RFValue(16)} color={'#ccc'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  text: {
    width: '10%',
    marginLeft: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
  inputContainer: {
    width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingBottom: 15,
    height: '100%',
    color: Colors.text,
    bottom: -1,
  },
  icon: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

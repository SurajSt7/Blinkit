import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from './CustomText';
import {goBack} from '../../utils/NavigationUtils';

const CustomHeader: React.FC<{title: string; search?: boolean}> = ({
  title,
  search,
}) => {
  return (
    <SafeAreaView style={{}}>
      <View style={styles.flexRow}>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-back" size={RFValue(16)} color={Colors.text} />
        </Pressable>
        <CustomText
          style={styles.text}
          variant="h5"
          fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
        <View>
          {search && (
            <Icon name="search" color={Colors.text} size={RFValue(16)} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
});

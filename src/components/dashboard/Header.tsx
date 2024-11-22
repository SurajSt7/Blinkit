import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import {Fonts} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthStore} from '../../state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header: React.FC<{showNotice: () => void}> = ({showNotice}) => {
  const {user, setUser} = useAuthStore();

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText variant="h8" style={styles.text} fontFamily={Fonts.Bold}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h2"
            style={styles.text}>
            10 mins
          </CustomText>
          <TouchableOpacity onPress={showNotice} style={styles.noticeButton}>
            <CustomText
              style={{color: '#3b4886'}}
              fontSize={RFValue(5)}
              fontFamily={Fonts.SemiBold}>
              ⛈️ Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText
            numberOfLines={1}
            variant="h8"
            fontFamily={Fonts.Medium}
            style={styles.text}>
            {user?.address || 'nowhere, somewhere 😅'}
          </CustomText>
          <Icon
            name="menu-down"
            color="#FFF"
            size={RFValue(20)}
            style={{bottom: -1}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Icon name="account-circle-outline" size={RFValue(36)} color={'#FFF'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.select({ios: 4, android: 12}),
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  text: {
    color: '#FFF',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeButton: {
    backgroundColor: '#e8eaf5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
  text2: {
    color: '#fff',
    width: '90%',
    textAlign: 'center',
  },
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    paddingHorizontal: 8,
  },
});

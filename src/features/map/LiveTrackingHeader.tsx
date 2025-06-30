import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuthStore} from '../../state/authStore';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../utils/NavigationUtils';
import CustomText from '../../components/ui/CustomText';
import {Fonts} from '../../utils/Constants';

type LiveTrackingHeaderProps = {
  type: 'Customer' | 'Delivery';
  title: string;
  secondTitle: string;
};

const LiveTrackingHeader: React.FC<LiveTrackingHeaderProps> = props => {
  const {title, type, secondTitle} = props;
  const isCustomer = type === 'Customer';
  const {currentOrder, setCurrentOrder} = useAuthStore();

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (isCustomer) {
              navigate('ProductDashboard');
              if (currentOrder?.status === 'Delivered') {
                setCurrentOrder(null);
              }
              return;
            }
            navigate('DeliveryDashboard');
          }}>
          <Icon
            name="chevron-back"
            color={isCustomer ? '#fff' : '#000'}
            size={RFValue(16)}
          />
        </Pressable>
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}>
          {title}
        </CustomText>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}>
          {secondTitle}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default LiveTrackingHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  titleTextBlack: {
    color: '#000',
  },
  titleTextWhite: {
    color: '#fff',
  },
});

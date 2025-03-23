import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/ui/CustomText';
import {Colors, Fonts} from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

type ReportItemType = {
  iconName: string;
  underLine?: boolean;
  title: string;
  price: number;
};

const ReportItem: React.FC<ReportItemType> = props => {
  const {iconName, price, title, underLine} = props;
  return (
    <View
      style={[
        styles.flexRowBetween,
        {
          marginBottom: 12,
        },
      ]}>
      <View style={styles.flexRow}>
        <Icon
          name={iconName}
          style={{opacity: 0.7}}
          size={RFValue(12)}
          color={Colors.text}
        />
        <CustomText
          style={{
            textDecorationLine: underLine ? 'underline' : 'none',
            textDecorationStyle: 'dashed',
          }}
          variant="h8">
          {title}
        </CustomText>
      </View>
      <CustomText>₹{price}</CustomText>
    </View>
  );
};

const BillDetails: React.FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomText>
      <View style={styles.billContainer}>
        <ReportItem
          iconName="article"
          price={totalItemPrice}
          title="Items total"
        />
        <ReportItem iconName="pedal-bike" price={29} title="Delivery Charge" />
        <ReportItem iconName="shopping-bag" price={2} title="Handling Charge" />
        <ReportItem iconName="cloudy-snowing" price={3} title="Surge Charge" />
      </View>
      <View
        style={[
          styles.flexRowBetween,
          {
            marginBottom: 16,
          },
        ]}>
        <CustomText
          variant="h7"
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          Grand Total
        </CustomText>
        <CustomText
          variant="h7"
          style={styles.text}
          fontFamily={Fonts.SemiBold}>
          ₹{totalItemPrice + 34}
        </CustomText>
      </View>
    </View>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginVertical: 16,
    // padding: 12,
  },
  text: {
    marginHorizontal: 12,
    marginTop: 16,
  },
  billContainer: {
    padding: 12,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

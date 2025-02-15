import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {NOTICE_HEIGHT} from '../../utils/Scaling';
import CustomText from '../ui/CustomText';
import {Fonts} from '../../utils/Constants';
import {Defs, G, Path, Svg, Use} from 'react-native-svg';
import {wavyData} from '../../utils/dummyData';

const Notice: React.FC = () => {
  return (
    <View style={{height: NOTICE_HEIGHT - 8}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <CustomText
              variant="h7"
              fontFamily={Fonts.SemiBold}
              style={styles.heading}>
              It's raining here in your location
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={Fonts.SemiBold}
              style={styles.textCenter}>
              Our delivery partners may take longer to reach you.
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width={'100%'}
        height={'35'}
        fill={'#ccd5e4'}
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y={'321'}></Use>
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccd5e4',
  },
  heading: {
    color: '#2d3875',
    marginBottom: 8,
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  wave: {
    transform: [{rotate: '180deg'}],
  },
});

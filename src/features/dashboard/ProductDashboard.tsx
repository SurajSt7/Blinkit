import {
  StyleSheet,
  Animated as RNAnimated,
  SafeAreaView,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomText from '../../components/ui/CustomText';
import NoticeAnimation from './NoticeAnimation';
import {NOTICE_HEIGHT, screenHeight} from '../../utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';
import Content from '../../components/dashboard/Content';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '../../utils/Constants';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {WithCart} from '../cart/WithCart';

const NOTICE_HEIGHT_ = -(NOTICE_HEIGHT + 12);

const ProductDashboard: React.FC = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT_)).current;
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);
  const [data, setData] = useState<string>('');

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});
    previousScroll.current = scrollY.value;
    return {
      transform: [{translateY}],
      opacity,
    };
  });

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT_,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    // const toggleSlide = () => {
    //   slideDown();
    //   setTimeout(() => {
    //     slideUp();
    //   }, 1200);
    // };
    // toggleSlide();
    // const interval = setInterval(toggleSlide, 1200);
    // return () => clearInterval(interval);
    slideDown();
    const timeout = setTimeout(() => {
      slideUp();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <StatusBar hidden translucent />
        <SafeAreaView />
        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
            <Icon
              name="arrow-up-circle-outline"
              color={'white'}
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to Top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={[styles.transparent]}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeout = setTimeout(() => {
                  slideUp();
                }, 2000);
                return () => clearTimeout(timeout);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />
            <View style={{padding: 20}}>
              <CustomText
                fontSize={RFValue(26)}
                style={{opacity: 0.2}}
                fontFamily={Fonts.SemiBold}>
                India's last minute app 🥭
              </CustomText>
              <CustomText
                style={{opacity: 0.2, paddingBottom: 50, marginTop: 12}}
                fontFamily={Fonts.SemiBold}>
                Developed by someone ❤️
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

export default WithCart(withCollapsibleContext(ProductDashboard));

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.select({ios: screenHeight * 0.18, android: 100}),
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    zIndex: 10,
  },
});

import {StyleSheet, Animated, SafeAreaView, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CustomText from '../../components/ui/CustomText';
import NoticeAnimation from './NoticeAnimation';
import {NOTICE_HEIGHT} from '../../utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';

const NOTICE_HEIGHT_ = -(NOTICE_HEIGHT + 12);

const ProductDashboard: React.FC = () => {
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT_)).current;

  const slideUp = () => {
    Animated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT_,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(noticePosition, {
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
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
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
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

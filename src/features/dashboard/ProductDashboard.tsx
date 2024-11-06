import {StyleSheet, Animated, SafeAreaView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CustomText from '../../components/ui/CustomText';
import NoticeAnimation from './NoticeAnimation';
import {NOTICE_HEIGHT} from '../../utils/Scaling';
import Visuals from './Visuals';

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
        <CustomText>Product Dashboard</CustomText>
      </>
    </NoticeAnimation>
  );
};

export default ProductDashboard;

const styles = StyleSheet.create({});

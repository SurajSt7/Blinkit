import React, {Ref} from 'react';
import {StyleSheet, View, Animated as RNAnimated, Animated} from 'react-native';
import {NOTICE_HEIGHT} from '../../utils/Scaling';
import Notice from '../../components/dashboard/Notice';

const NOTICE_HEIGHT_ = -(NOTICE_HEIGHT + 12);

const NoticeAnimation: React.FC<{
  noticePosition?: Animated.Value;
  children: React.ReactElement;
}> = ({noticePosition = new Animated.Value(0), children}) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePosition}]},
        ]}>
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT_, 0],
              outputRange: [0, NOTICE_HEIGHT_ + 20],
            }),
          },
        ]}>
        {children}
      </RNAnimated.View>
    </View>
  );
};

export default NoticeAnimation;

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 10,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

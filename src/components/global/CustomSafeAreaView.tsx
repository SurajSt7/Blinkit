import React from 'react';
import {StyleSheet, ViewStyle, SafeAreaView, View} from 'react-native';

type CustomSafeAreaViewProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const CustomAreaView: React.FC<CustomSafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View>{children}</View>
    </SafeAreaView>
  );
};

export default CustomAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

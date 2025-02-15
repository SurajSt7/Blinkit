import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '../../components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../utils/Constants';

type SideBarProps = {
  categories: any;
  selectedCategory: any;
  onCategoryPress: (category: any) => void;
};

const SideBar: React.FC<SideBarProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories.map(() => useSharedValue(0));

  useEffect(() => {
    let targetIndex = -1;
    categories.forEach((category: any, index: number) => {
      const isSelected = selectedCategory?._id === category?._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 500,
      });
      if (isSelected) targetIndex = index;
    });
    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {
        duration: 500,
      });
      runOnJS(() => {
        scrollRef.current?.scrollTo({
          y: targetIndex * 100,
          animated: true,
        });
      });
    }
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: indicatorPosition.value,
      },
    ],
  }));

  return (
    <View style={styles.sideBar}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        ref={scrollRef}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        <Animated.View>
          {categories.map((category: any, index: number) => {
            const animatedStyle = useAnimatedStyle(() => ({
              bottom: animatedValues[index].value,
            }));
            return (
              <TouchableOpacity
                onPress={() => onCategoryPress(category)}
                key={index}
                style={styles.categoryButton}
                activeOpacity={1}>
                <View
                  style={[
                    styles.imageContainer,
                    selectedCategory?._id === category?._id &&
                      styles.selectedImageContainer,
                  ]}>
                  <Animated.Image
                    source={{uri: category.image}}
                    style={[styles.image, animatedStyle]}
                  />
                </View>
                <CustomText fontSize={RFValue(8)} style={{textAlign: 'center'}}>
                  {category.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryButton: {
    padding: 12,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    borderRadius: 100,
    height: '70%',
    width: '75%',
    justifyContent: 'center',
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: '#f3f4f7',
    overflow: 'hidden',
    paddingVertical: 4,
    marginVertical: 12,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  selectedImageContainer: {
    backgroundColor: '#CFFFDB',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    top: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

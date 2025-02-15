import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {screenHeight, screenWidth} from '../../utils/Scaling';
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from '../ui/ScalePress';

const AddCarousel: React.FC<{addData: any}> = ({addData}) => {
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenHeight * 0.3,
  };
  return (
    <View style={{marginVertical: 20, alignItems: 'center'}}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode="parallax"
        data={addData}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        renderItem={({item}: any) => {
          return (
            <ScalePress style={styles.imageContainer}>
              <Image source={item} style={styles.img} />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};

export default AddCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    height: '95%',
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
});

import React, {useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {imageData} from '../../utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {screenHeight, screenWidth} from '../../utils/Scaling';

const ProductSlider: React.FC = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        endPaddingWidth={0}
        duration={10000}
        style={styles.autoScroll}>
        <View style={styles.gridContainer}>
          {rows?.map((item, index) => {
            return <MemoizedRow key={index} row={item} rowIndex={index} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

export default ProductSlider;

const Row: React.FC<{row: typeof imageData; rowIndex: number}> = ({
  row,
  rowIndex,
}) => {
  return (
    <View style={styles.row}>
      {row.map((item, index) => {
        const horizontalShift = rowIndex % 2 === 0 ? -20 : 20;
        return (
          <View
            style={[
              styles.itemContainer,
              {transform: [{translateX: horizontalShift}]},
            ]}
            key={index}>
            <Image source={item} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.22,
    height: screenHeight * 0.11,
    borderRadius: 20,
    backgroundColor: '#e9f7f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

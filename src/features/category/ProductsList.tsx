import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Constants';
import ProductItem from './ProductItem';
import {screenHeight} from '../../utils/Scaling';

const ProductsList: React.FC<{data: any}> = ({data}) => {
  const renderItem = ({item, index}: any) => {
    return <ProductItem item={item} index={index} />;
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item?._id}
      style={styles.container}
      numColumns={2}
      ListFooterComponent={<View style={{height: screenHeight * 0.051}} />}
    />
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    height: '100%',
  },
  content: {
    paddingVertical: 12,
    paddingBottom: 100,
  },
});

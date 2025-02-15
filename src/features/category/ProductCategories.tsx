import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import CustomHeader from '../../components/ui/CustomHeader';
import {Colors} from '../../utils/Constants';
import {
  getAllCategories,
  getProductsByCategoryId,
} from '../../../service/productService';
import SideBar from './SideBar';
import ProductsList from './ProductsList';
import {WithCart} from '../cart/WithCart';

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await getAllCategories();
      setCategories(data);
      if (data && data.length > 0) {
        setSelectedCategories(data[1]);
      }
    } catch (er) {
      console.log('Caught an error: ', er);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (selectedId: string) => {
    try {
      setProductsLoading(true);
      const data = await getProductsByCategoryId(selectedId);
      setProducts(data);
    } catch (er) {
      console.log('Caught an error: ', er);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategories?._id) fetchProducts(selectedCategories?._id);
  }, [selectedCategories]);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategories?.name || 'Catogories'} search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <ActivityIndicator size={'small'} color={Colors.border} />
        ) : (
          <SideBar
            categories={categories}
            selectedCategory={selectedCategories}
            onCategoryPress={(category: any) => setSelectedCategories(category)}
          />
        )}
        {productsLoading ? (
          <ActivityIndicator
            size={'small'}
            color={Colors.border}
            style={styles.center}
          />
        ) : (
          <ProductsList data={products || []} />
        )}
      </View>
    </View>
  );
};

export default WithCart(ProductCategories);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

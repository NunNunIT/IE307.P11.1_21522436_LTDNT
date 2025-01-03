import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Image } from 'react-native';
import { ProductCard } from '~/components/card/product';
import { Text } from '~/components/ui/text';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { Spacings, Carousel } from 'react-native-ui-lib';
import _ from 'lodash';
const { width, height } = Dimensions.get("screen");

const decorate = [
  { img: require('~/assets/images/decorate/1.png') },
  { img: require('~/assets/images/decorate/9.png') },
  { img: require('~/assets/images/decorate/3.png') },
  { img: require('~/assets/images/decorate/4.png') },
  { img: require('~/assets/images/decorate/6.png') },
  { img: require('~/assets/images/decorate/7.png') },
];

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatProductData = () => {
    const hotDeals = products.slice(0, 6).map((item) => ({
      ...item,
      section: 'Hot Deals🔥',
    }));
    const newArrivals = products.slice(6, 12).map((item) => ({
      ...item,
      section: 'New Arrivals ⏱️',
    }));
    return [...hotDeals, ...newArrivals];
  };

  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayInterval={5000}
        loop
        initialPage={2}
        pageWidth={width}
        containerStyle={{ height: height, position: 'absolute' }}
        allowAccessibleLayout>
        {decorate.map((item, index) => (
          <Image
            key={index}
            source={item.img}
            className="h-full w-full object-cover"
            resizeMode="cover"
          />
        ))}
      </Carousel>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatGrid
          itemDimension={150}
          data={formatProductData()}
          spacing={8}
          renderItem={({ item }) => <ProductCard data={item} />}
          ListHeaderComponent={() => (
            <Text className="mb-2 text-3xl font-bold text-red-500">Hot Deals🔥</Text>
          )}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatGrid
          itemDimension={150}
          data={formatProductData()}
          spacing={8}
          renderItem={({ item }) => <ProductCard data={item} />}
          ListHeaderComponent={() => (
            <Text className="mb-2 text-3xl font-bold text-red-500">New Arials ⏱️</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
});

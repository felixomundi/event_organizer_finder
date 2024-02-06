
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from './../Components/ProductCard';
import CategoryCard from '././../Components/CategoryCard';

const products = [
  { id: 1, name: 'Product 1', price: '$20',image:require('../../assets/images/splash.jpg'),description:"nnnnnnnnnnnnnnnnnnnnnnnnnnn" },
  { id: 2, name: 'Product 2', price: '$30', image: require('../../assets/images/splash.jpg'),description:"nnnnnnnnnnnnnnnnnnnnnnnnnnn" },
  { id: 3, name: 'Product 3', price: '$30', image:require('../../assets/images/splash.jpg'),description:"nnnnnnnnnnnnnnnnnnnnnnnnnnn" },
  // Add more products as needed
];

const categories = [
  { id: 1, name: 'Category 1',image:require('../../assets/images/splash.jpg') },
  { id: 2, name: 'Category 2',image:require('../../assets/images/splash.jpg') },
  // Add more categories as needed
];

const Home = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
      <View>
        <Text style={styles.welcome}>Welcome to </Text>
        <Text style={styles.app}>Vaibu App</Text>
        </View>       
      </View>
      <Text style={styles.title}>Featured Events</Text>     
      <FlatList 
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
        
             <ProductCard product={item}   />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
     

      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CategoryCard category={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20,
  },
  app: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
    letterSpacing:1,
  },
  welcome:{
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default Home;

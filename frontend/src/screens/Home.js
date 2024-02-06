
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from './../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { useDispatch, useSelector } from "react-redux"
import { getEvents } from '../redux/slices/events';
import Loader from "../components/Loader"
const products = [
  { id: 1, name: 'Product 1', price: '20',image:require('../../assets/images/splash.jpg'),description:"nnnnnnnnnnnnnnnnnnnnnnnnnnn" },
  { id: 2, name: 'Product 2', price: '30', image: require('../../assets/images/splash.jpg'),description:"nnnnnnnnnnnnnnnnnnnnnnnnnnn" },
  { id: 3, name: 'Product 3', price: '30', image:require('../../assets/images/splash.jpg'),description:"nnnnnnnnnnnnnnnnnnnnnnnnnnn" },

];

const categories = [
  { id: 1, name: 'Category 1', image:require('../../assets/images/splash.jpg') },
  { id: 2, name: 'Category 2', image:require('../../assets/images/splash.jpg') },
 
];

const Home = () => {
  const { events, isLoading, isError, message } = useSelector(state => state.events);  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEvents())    
   
  },[dispatch])
  return (
    <View style={styles.container}>
        <View style={styles.header}>
      <View>
        <Text style={styles.welcome}>Welcome to </Text>
        <Text style={styles.app}>Vaibu App</Text>
        </View>       
      </View>
      <Text style={styles.title}>Featured Events</Text>  
      {isError && (<Text style={styles.error}>Failed to fetch event items</Text>)}
      {
        isLoading ? (
          <Loader></Loader>) : (
            <>
              {events?.length > 0 ? (<>
              <FlatList 
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>        
             <ProductCard product={item}   />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />    
              </>) : <Text style={styles.error}> No available events</Text>}
            
      </>
          )
    }
      

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
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize:30
  }
});

export default Home;

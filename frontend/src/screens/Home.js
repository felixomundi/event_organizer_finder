
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from './../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { useDispatch, useSelector } from "react-redux"
import { getEvents } from '../redux/slices/events';
import Loader from "../components/Loader"
import {  logout } from '../redux/slices/auth';


const categories = [
  { id: 1, name: 'Category 1', image:require('../../assets/logo.png') },
  { id: 2, name: 'Category 2', image:require('../../assets/cart.png') },
 
];

const Home = () => {
  const { events, isLoading, isError, message } = useSelector(state => state.events); 
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.email) {
      dispatch(getEvents())
    }
    else {      
      dispatch(logout())
    }

  }, [dispatch,user])
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
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>        
             <ProductCard event={item}   />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />    
              </>) : <Text style={styles.error}> No available events</Text>}
            
      </>
          )
    }
      

      <Text style={styles.title}>Features Venues</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
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
    color: '#FFA500',
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

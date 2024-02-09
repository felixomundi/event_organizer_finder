import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import Auth from "../components/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../redux/slices/ticket';
import { logout } from '../redux/slices/auth';
import Loader from '../components/Loader';
import { image_url } from '../utils';
const CartScreen = () => {
  const dispatch = useDispatch();
  const { tickets,isLoading } = useSelector(state => state.tickets); 
  const {user} = useSelector(state=>state.auth)
  useEffect(() => {
    if (!user.email) {
      dispatch(logout())
    } else {
      dispatch(getTickets())
    }
  }, [user.email]);
  
  <Auth/>
  //   const cartItems = [
  //   { id: 1, name: 'Product 1', price: 20, quantity: 2, image: require("../../assets/images/splash.jpg") },
  //   { id: 2, name: 'Product 2', price: 30, quantity: 1, image: require("../../assets/images/splash.jpg")  },   
  // ];
  const onPressCheckout = () => {
    
  }
  const onPressRemoveItem = () => {
    
  }

  // const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      {!isLoading && tickets.length === 0 ? (<></>) : (
      <>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {tickets.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={ image_url(item) } style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.event_name}</Text>
              <Text style={styles.itemPrice}>${item.entry_fee}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onPressRemoveItem(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>           
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>    
       <View style={styles.totalContainer}>
        <Text>Total: $300</Text>
        <Button title="Checkout" style={styles.checkout_button} onPress={onPressCheckout} />
        </View>
      </>)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollViewContent: {
    paddingBottom: 80, 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#ff6347',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
    totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  checkout_button: {
    backgroundColor: 'green',
       borderRadius: 8,
    }
 
});

export default CartScreen;

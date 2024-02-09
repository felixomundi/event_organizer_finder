import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import Auth from "../components/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { cartTotal, getTickets } from '../redux/slices/ticket';
import { logout } from '../redux/slices/auth';
import Loader from '../components/Loader';
import { image_url } from '../utils';

const  CartScreen = () => {
  const dispatch = useDispatch();
  const { tickets,isLoading, total, totalTicketItems } = useSelector(state => state.tickets); 
  const {user} = useSelector(state=>state.auth)
  useEffect(() => {
    if (!user.email) {
      dispatch(logout())
    } else {
      dispatch(getTickets());
      dispatch(cartTotal());
    }
  }, [user.email]);
  
  <Auth/>
  
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
            <Image source={ {uri:image_url(item.Event)} } style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Event Name : {item.Event.event_name}</Text>
              <Text style={styles.itemName}>Event Venue : {item.Event.location}</Text>
              <Text style={styles.itemPrice}>Entry Fee: Ksh.{item.Event.entry_fee}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onPressRemoveItem(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>           
            </TouchableOpacity>
          </View>
        ))}
          </ScrollView>    
          <View>
            <Text style={{ backgroundColor: "yellow", fontSize: 20, padding: 10 }}>Total Items {totalTicketItems }</Text>
          </View>
       <View style={styles.totalContainer}>
            <Text>Total: Ksh. {total}</Text>
            <TouchableOpacity onPress={() => {
              
            }}
            style={styles.btn_danger}><Text style={styles.btn_text}>Clear Cart</Text></TouchableOpacity>
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
    fontSize: 14,
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
  },
  btn_danger: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  btn_text: {   
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
  
  }
 
});

export default CartScreen 



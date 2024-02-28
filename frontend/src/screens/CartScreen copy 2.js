"use strict"
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Button, Alert } from 'react-native';
import Auth from "../components/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { cartTotal, clearCart, deleteCartItem, getTickets, resetTicket } from '../redux/slices/ticket';
import { logout } from '../redux/slices/auth';
import Loader from '../components/Loader';
import { image_url } from '../utils';
import { useNavigation } from "@react-navigation/native"
import { createOrder, resetOrderStore } from '../redux/slices/orders';
const  CartScreen = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading, total, message } = useSelector(state => state.tickets); 
  const { user } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const {orders} = useSelector(state => state.orders);

  useEffect(() => {
    if (user && user.email) {
      dispatch(getTickets());
      dispatch(cartTotal());
    } else {
      dispatch(logout())
    }
    if (message) {
      alert(message)
    }
    dispatch(resetTicket())
  }, [user, message, dispatch]);
  useEffect(() => {
    if (orders.message) {
     alert(orders.message)
    }  
    dispatch(resetOrderStore())
  }, [orders.message,dispatch]);
  
  () => {
    <Auth/>
 }
  
  const onPressCheckout = () => {
    dispatch(createOrder());
  } 

  function handleDeleteCartItem (item){
    Alert.alert('Clear Cart', 'Are you sure you want to delete this cart item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => { 
          if (user && user.email) {
            dispatch(deleteCartItem(item));
            dispatch(getTickets());
            dispatch(cartTotal());
          } else {
            dispatch(logout())
         }  
        },
        style: 'destructive',
      },
    ]);
  }
  function handleClearCart() {
    Alert.alert('Clear Cart', 'Are you sure you want to clear your cart', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear Cart',
        onPress: () => { 
          if (user && user.email) {
            dispatch(clearCart()); 
          }         
          else {
            dispatch(logout())
          }
        },
        style: 'destructive',
      },
    ]);
  }
  if (isLoading) {
    return <Loader />
  }
  if (orders.isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      {!isLoading && tickets.length === 0 ? (
        <View>
          <Text style={{
            fontSize: 20,
            color:'red'
          }}>Empty Cart</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("HomePage")
           }} style={[styles.button]}>
             <Text style={[styles.text]}>Book New Ticket</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
              onPress={() => handleDeleteCartItem(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>           
            </TouchableOpacity>
          </View>
        ))}
          </ScrollView>    
          <View>
            <Text style={{ backgroundColor: "yellow", fontSize: 20, padding: 10 }}>Total Items {tickets?.length }</Text>
          </View>
       <View style={styles.totalContainer}>
            <Text>Total: Ksh. {total}</Text>
            <TouchableOpacity onPress={() => {
              handleClearCart()
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
  
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:10
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
 
});

export default CartScreen 



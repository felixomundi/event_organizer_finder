import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Button, Alert } from 'react-native';
import Auth from "../components/Auth";
import { useDispatch, useSelector } from 'react-redux';
import { cartTotal, clearCart, deleteCartItem, getTickets, resetTicket } from '../redux/slices/ticket';
import { logout } from '../redux/slices/auth';
import Loader from '../components/Loader';
import { image_url } from '../utils';
import { useNavigation } from "@react-navigation/native"
import { createOrder } from '../redux/slices/orders';

const CartScreen = () => {
  <Auth />
  const dispatch = useDispatch();
  const { orders, isLoading:loading,message:orderMessage } = useSelector(state => state.orders);
  const { tickets, isLoading, total, message } = useSelector(state => state.tickets); 
  const { user } = useSelector(state => state.auth);
  const navigation = useNavigation();  
  useEffect(() => {   
    dispatch(getTickets());
    dispatch(cartTotal());  
    if (message) {
      Alert.alert("Message", message);
    }
    if (orderMessage) {
      Alert.alert("Order Message", orderMessage);
    }    
    dispatch(resetTicket());
  }, [message, dispatch, orderMessage]);

  function handleDeleteCartItem(item) {
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
  async function createYourOrder() {
    if (user && user.email) {      
      await dispatch(createOrder());
      await dispatch(getTickets());  
    } else {
      dispatch(logout());
    }
}
  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {!isLoading && tickets.length === 0 ? (
        <View>
          <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={styles.browseEventsButton}>
            <Text style={styles.buttonText}>Browse Events</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {tickets.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image source={{ uri: image_url(item.Event) }} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>Event: {item.Event.event_name}</Text>
                  <Text style={styles.itemVenue}>Venue: {item.Event.location}</Text>
                  <Text style={styles.itemPrice}>Price: Ksh. {item.Event.entry_fee}</Text>
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
            <Text style={styles.totalItemsText}>Total Items: {tickets?.length }</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: Ksh. {total}</Text>
            <TouchableOpacity onPress={handleClearCart} style={styles.clearCartButton}>
              <Text style={styles.clearCartButtonText}>Clear Cart</Text>
            </TouchableOpacity>
              <TouchableOpacity  onPress={createYourOrder} style={styles.checkoutButton}
              >
                   <Text style={styles.checkoutText}>Create Order</Text>
              </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc', // Set background color to black
    padding: 16,
  },
  emptyCartText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  browseEventsButton: {
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
    backgroundColor: '#fff', // Set background color to white
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
    marginBottom: 4,
    color: '#000',
  },
  itemVenue: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#000',
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
  totalItemsText: {
    backgroundColor: "yellow",
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  clearCartButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  clearCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartScreen;

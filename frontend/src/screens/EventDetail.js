import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, Button } from 'react-native';
import { image_url } from '../utils';
import { useDispatch, useSelector } from "react-redux"
import {logout} from "../redux/slices/auth"
import Auth from '../components/Auth';
import { addTicketToCart, resetTicket } from '../redux/slices/ticket';
import Loader from '../components/Loader';
import Map from '../components/Map';
const EventDetail = ({ route }) => {
  const { event } = route.params;
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isLoading, message, isError } = useSelector(state => state.tickets);
  const eventLatitude = 37.78825; // Example latitude
  const eventLongitude = -122.4324; // Example longitude
  useEffect(() => {
    if (message) {
      Alert.alert(message);
    }
    dispatch(resetTicket())
  }, [message]);
  <Auth />

  const handleAddToCart = () => {   
    if (user.email) {
      const data ={ event_id : event.id};
      dispatch(addTicketToCart(data))
    } else {
      dispatch(logout());
    }   
  };
  if (isLoading) {
    return <Loader />
  }
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url(event) }} style={styles.productImage} />
      <View style={{flexDirection:'row'}}><Text style={styles.text}>Location: { event.location} </Text></View>
      <Text style={styles.productName}>Event Name: {event.event_name} </Text>
      <Text style={styles.productPrice}>Ticket Fee: Ksh. {event.entry_fee}</Text>
      <Text style={styles.productDescription}>{event.details}</Text>
      <Button title="Book Event" style={styles.add_to_cart_button} onPress={handleAddToCart} />
      <Map latitude={eventLatitude} longitude={eventLongitude} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 8,
    fontWeight:'bold'
  },
  productDescription: {
    fontSize: 16,
  },
  add_to_cart_button: {
    marginTop: 30,
    borderRadius:8
  },
 text: { fontSize: 25, fontWeight: "800", color: 'green'  },
});


export default EventDetail;
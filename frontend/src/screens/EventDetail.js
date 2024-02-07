import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, Button } from 'react-native';
import { image_url } from '../utils';
import { useDispatch, useSelector } from "react-redux"
import {useNavigation} from "@react-navigation/native"
import Loader from '../components/Loader';
import {logout, reset} from "../redux/slices/auth"
const EventDetail = ({ route }) => {
  const navigation = useNavigation()
  const { event } = route.params;
  const { user,isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.email) {
      dispatch(logout())
      // navigation.navigate('Home')
    }
    dispatch(reset())
  },[user.email])
  

  const handleAddToCart = () => {   
    if (user.email){
    // dispatch(addtoCart({event}))
    } else {
      dispatch(logout());
    }

    // Alert.alert('Product added to cart!');
  };
  if (isLoading) {
    return <Loader />
  }
  return (
    <View style={styles.container}>
      <Image source={{uri:image_url(event)} } style={styles.productImage} />
      <Text style={styles.productName}>{event.event_name}</Text>
      <Text style={styles.productPrice}>{event.entry_fee}</Text>
      <Text style={styles.productDescription}>{event.details}</Text>
      <Button title="Book Event" style={styles.add_to_cart_button} onPress={handleAddToCart} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
  },
  add_to_cart_button: {
    marginTop: 30,
    borderRadius:8
  }
});

export default EventDetail;
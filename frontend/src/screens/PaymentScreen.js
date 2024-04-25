import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import Auth from '../components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, orderPayment, resetOrderStore } from '../redux/slices/orders';
import Loader from '../components/Loader';
import { logout } from '../redux/slices/auth';
const PaymentScreen = ({ route }) => {
  <Auth /> 
  const [phoneNumber, setPhoneNumber] = useState('');
  const order = route.params.item;
  const orderId = order.id;
  const total = order.total;
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector(state => state.orders);
  const {user} = useSelector(state => state.auth.user);

  useEffect(() => {
    if (message) {
      Alert.alert("Order Message", message);
    }
    dispatch(resetOrderStore());
  }, [message, dispatch]);
  
  const handlePayment = async () => {  
    if (user && !user.email) {
      dispatch(logout());
    }
    if (phoneNumber.length !== 10 || !phoneNumber.startsWith('0')) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number starting with zero and with 10 digits.');
      return;
    }else if (orderId && phoneNumber) {     
     
      const data = {
        phone: phoneNumber,
        orderId:orderId
      }
      await dispatch(orderPayment(data));
      await dispatch(getOrders());
   
    }
  };  

  if (isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
     
      <Text style={styles.heading}>Enter Payment Details</Text>
      <Text style={styles.label}>Amount to Pay:    <Text style={styles.amount}>Ksh. {total} </Text></Text>
   
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={text => {       
          const numericText = text.replace(/[^0-9]/g, '');
          setPhoneNumber(numericText);
        }}
      />
      {/* <Button title="Pay Now" onPress={handlePayment} style={styles.payButton} /> */}

      <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentScreen;

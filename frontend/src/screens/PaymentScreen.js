import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Auth from '../components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { cartTotal, getTickets, resetTicket } from '../redux/slices/ticket';
import { resetOrderStore } from '../redux/slices/orders';

const PaymentScreen = () => {
  <Auth />

  const [phoneNumber, setPhoneNumber] = useState(''); 

  const dispatch = useDispatch();
  const { message,isLoading, total } = useSelector(state => state.tickets);
  const { message: orders_message, isLoading: orders_isLoading } = useSelector(state => state.orders);

  useEffect(() => {   
    dispatch(getTickets());
    dispatch(cartTotal());  
    if (message) {
      Alert.alert("Message", message);
    }
    dispatch(resetTicket());
  }, [message, dispatch]);
  useEffect(() => {
    if (orders_message) {
      Alert.alert("Order Message", orders_message);
    }
    dispatch(resetOrderStore());
  }, [orders_message, dispatch]);
  
  const handlePayment = () => {     
    if (phoneNumber.length !== 10 || !phoneNumber.startsWith('0')) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number starting with zero and with 10 digits.');
      return;
    }
    console.log(`M-Pesa Phone Number: ${phoneNumber}`);    
    // await dispatch(createOrder());
    // await dispatch(getTickets());
  };  
  if (isLoading || orders_isLoading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Payment Details</Text>
      <Text style={styles.label}>Amount to Pay:</Text>
      <Text style={styles.amount}>Ksh. {total}</Text>
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
      <Button title="Pay Now" onPress={handlePayment} />
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
});

export default PaymentScreen;

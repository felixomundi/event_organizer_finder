import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Auth from "../components/Auth"
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/slices/orders';
import Loader from '../components/Loader';
import { formatDate } from '../utils';


const Orders = ({navigation}) => {
  <Auth />
  const { orders, isLoading, isError } = useSelector(state => state.orders);  
  const dispatch = useDispatch();
  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      <Text style={styles.orderInfo}>Ordered Date: {formatDate(item.createdAt)}</Text>
      <Text style={styles.orderInfo}>Ticket's Total: Ksh. {item.total}</Text>
      {item.status === "Paid" ? (
        <Text style={[styles.orderStatus, styles.paid]}>Paid</Text>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("PaymentScreen",{item})} style={styles.payNowButton}>
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading orders. Please try again later.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>    
      <FlatList
        data={orders}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  orderItem: {
    paddingVertical: 10,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderInfo: {
    marginBottom: 5,
  },
  orderStatus: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  paid: {
    backgroundColor: 'green',
    color: 'white',
  },
  payNowButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  payNowText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default Orders;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, resetOrderDetail } from '../redux/slices/orders';
import Loader from '../components/Loader';
import { image_url } from '../utils';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
    return () => {
      dispatch(resetOrderDetail());
    };
  }, [dispatch]);

  const handleOrderDetail = (order) => {
    // Navigate to order detail screen or show more details
    // You can implement this based on your navigation setup
    console.log('View Order Detail:', order);
  };

  const handleCancelOrder = (orderId) => {
    // Implement cancellation logic here
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          // Dispatch cancellation action
          // dispatch(cancelOrder(orderId));
        },
        style: 'destructive',
      },
    ]);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading orders. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View>
          <Text style={styles.emptyText}>No orders available.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {orders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              <Image source={{ uri: image_url(order.event) }} style={styles.image} />
              <View style={styles.orderDetails}>
                <Text style={styles.eventName}>Event Name: {order.event.event_name}</Text>
                <Text style={styles.eventLocation}>Event Venue: {order.event.location}</Text>
                <Text style={styles.orderDate}>Order Date: {order.created_at}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.orderDetailButton}
                  onPress={() => handleOrderDetail(order)}>
                  <Text style={styles.orderDetailButtonText}>Order Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancelOrder(order.id)}>
                  <Text style={styles.cancelButtonText}>Cancel Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
    paddingBottom: 20,
  },
  orderContainer: {
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
  orderDetails: {
    flex: 1,
  },
  eventName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDetailButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  orderDetailButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: 'red',
  },
});

export default OrdersScreen;

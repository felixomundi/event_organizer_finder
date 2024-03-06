import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { image_url } from '../utils';
import { getOrderDetail, resetOrderDetail } from '../redux/slices/orders';

const OrderDetailScreen = ({ route }) => {
  const { orderId } = route.params;
  const dispatch = useDispatch();
  const { orderDetail, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderDetail(orderId));
    return () => {
      dispatch(resetOrderDetail());
    };
  }, [dispatch, orderId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading order details. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.orderContainer}>
          <Image source={{ uri: image_url(orderDetail.event) }} style={styles.image} />
          <View style={styles.orderDetails}>
            <Text style={styles.eventName}>Event Name: {orderDetail.event.event_name}</Text>
            <Text style={styles.eventLocation}>Event Venue: {orderDetail.event.location}</Text>
            <Text style={styles.orderDate}>Order Date: {orderDetail.created_at}</Text>
            {/* Add more order details as needed */}
          </View>
        </View>
      </ScrollView>
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
});

export default OrderDetailScreen;

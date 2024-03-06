import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Auth from "../components/Auth"
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/slices/orders';
import Loader from '../components/Loader';
import { formatDate } from '../utils';
const OrdersList = () => {
 
  <Auth></Auth>;

  const { orders, isLoading,isError } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
    <Text style={{ fontWeight: 'bold' }}>Order ID: {item.id}</Text>
      <Text>Ordered Date: {  formatDate(item.createdAt)    }</Text>
    {/* <Text>Product: {item.product}</Text>
    <Text>Quantity: {item.quantity}</Text> */}
    <Text>Tickets Total: Ksh. {item.total}</Text>
  </View>
  );



  useEffect(() => {
    dispatch(getOrders());
    
  },[dispatch])

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return (<View style={{
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    }}>
      <Text>Error loading orders. Please try again later.</Text>
    </View>)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OrdersList;
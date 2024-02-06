import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CartScreen = () => {

  const cartItems = [
    { id: 1, name: 'Product 1', price: 20, quantity: 2, image: require("../../assets/images/splash.jpg") },
    { id: 2, name: 'Product 2', price: 30, quantity: 1, image: require("../../assets/images/splash.jpg")  },
    // Add more items as needed
  ];

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={ item.image} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text>{item.name}</Text>
              <Text>{item.price} x {item.quantity}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${totalPrice}</Text>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;

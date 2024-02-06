import React from 'react';
import { View, Text, Image, StyleSheet, Alert, Button } from 'react-native';

const EventDetail = ({ route }) => {
  const { product } = route.params;
  const handleAddToCart = () => {   
    Alert.alert('Product added to cart!');
  };
  return (
    <View style={styles.container}>
      <Image source={product.image } style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Button title="Add to Cart" style={styles.add_to_cart_button} onPress={handleAddToCart} />
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
    marginTop:30
  }
});

export default EventDetail;
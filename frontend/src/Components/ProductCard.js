import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {image_url} from "../utils/"
const ProductCard = ({ event }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('EventDetail', { event });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
    <View >
      <Image source={{uri:image_url(event)}} style={styles.productImage} />
      <Text style={styles.productName}>{event.event_name}</Text>
      <Text style={styles.productPrice}>{event.entry_fee}</Text>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    width: 150,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    fontWeight:'bold'
  },
});

export default ProductCard;

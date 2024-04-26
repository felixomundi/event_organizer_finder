import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image_url } from "../utils/";

const ProductCard = ({ event }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('EventDetail', { event });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: image_url(event) }} style={styles.productImage} />
      <View style={styles.infoContainer}>
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
    padding: 8,
    marginRight: 8,
    width: 140,
  },
  productImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  infoContainer: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
  },
});

export default ProductCard;

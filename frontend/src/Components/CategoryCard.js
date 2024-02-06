// src/components/CategoryCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CategoryCard = ({ category }) => {
  return (
    <View style={styles.card}>
      <Image source={category.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
    </View>
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
  categoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryCard;

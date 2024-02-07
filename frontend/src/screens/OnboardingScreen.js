import React from 'react'
import {   StyleSheet,  Text, TouchableOpacity, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';
function OnboardingScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Welcome to Vaibu App</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('LoginScreen')} 
    >
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set background color here
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333', // Set title color here
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OnboardingScreen
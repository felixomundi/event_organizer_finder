import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import Loader from '../components/Loader';
import { logout, reset } from '../redux/slices/auth';
const Account = ({ navigation }) => {
  const { isLoading, user, isSuccess } = useSelector(state => state.auth);
  const [name, setName] = useState(user && user.name || "");
  const [email, setEmail] = useState(user && user.email) || "";

  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.email) {

    } else {
      dispatch(logout())
      navigation.navigate('LoginScreen');
    }
    dispatch(reset())
  }, [user,navigation,dispatch])
  
  const handleSave = () => {    
    
  };

  const handleLogout = () => {   
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async() => { 
          dispatch(logout());
          navigation.navigate('HomeScreen'); 
        },
        style: 'destructive',
      },
    ]);
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />    
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>View Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Account;

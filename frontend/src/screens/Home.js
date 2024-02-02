import React from 'react'
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';

const  Home = ()=> {
  const navigation = useNavigation();
  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
   
  ];
  const renderItem = ({ item }) => (
    <View style={{
      padding: 20,
      marginVertical: 8,
    marginHorizontal:16}}>
      <Text>{item.title}</Text>
    </View>
  );
  const styles = StyleSheet.create({
    safe_area_view: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor:'#ffff'
    },
    header:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:20,
    },
    app: {
      fontSize: 30,
      fontWeight: 'bold',
      color:'green'
    },
    welcome:{
      fontSize: 20,
      fontWeight: 'bold'
    },
    image: {
      width: '20px',
      height:'20px'
    },
  })
    // <View>
    // <Pressable onPress={() => navigation.navigate("Login")} >
    //   <Text>Please Login</Text>
    // </Pressable>
    // </View>
  return (
    <SafeAreaView style={styles.safe_area_view}>
    <View style={styles.header}>
      <View>
        <Text style={styles.welcome}>Welcome to </Text>
        <Text style={styles.app}>Vaibu App</Text>
        </View>       
      </View>
      <View style={{
        flexDirection: 'row',
        marginTop: 20,
      }}>
        <FlatList          
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />

      </View>

    </SafeAreaView>
  )
}

export default Home

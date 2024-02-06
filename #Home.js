import React from 'react'
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';

const  Home = ()=> {
  const navigation = useNavigation();
  const data = [
    { id: '1', title: 'Item 1',price:'100', image:require('../../assets/images/splash.jpg') },
    { id: '2', title: 'Item 2',price:'100', image:require('../../assets/images/splash.jpg') },
    { id: '3', title: 'Item 3', price: '100', image: require('../../assets/images/splash.jpg') },
    { id: '4', title: 'Item 3', price: '100', image: require('../../assets/images/splash.jpg') },
    { id: '5', title: 'Item 3', price: '100', image: require('../../assets/images/splash.jpg') },
    { id: '6', title: 'Item 3', price: '100', image: require('../../assets/images/splash.jpg') },
    { id: '7', title: 'Item 3', price: '100', image: require('../../assets/images/splash.jpg') },
    { id: '8', title: 'Item 3',price:'100', image:require('../../assets/images/splash.jpg') },
   
  ];
  const renderItem = ({ item }) => (
    <View style={{     
      marginVertical: 8,
      marginHorizontal: 16,
      // flexDirection:'column',
      flex:1,
      width: '100%', 
      height: "300px",
      // borderRadius: 20,
      // borderWidth: 1,
      // justifyContent:'center'
    }}>
      
      <Image style={{
        width: '80%',
        height: 100,    
        // borderRadius:20
      }}
      source={item.image}
      ></Image>
      <Text style={{        
        fontSize: 20,
        paddingBottom:10
      }}>{item.title}</Text>
      <Text style={styles.price}>Price:Ksh.100</Text>
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
      color: 'green',
      letterSpacing:1,
    },
    welcome:{
      fontSize: 20,
      fontWeight: 'bold'
    },
    image: {
      width: '20px',
      height:'20px'
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'red',
      paddingBottom:10
      
    }
  })
  
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
        justifyContent: 'space-between', alignItems: 'start'
      }}
      
      >
     <View style={{
        flexDirection: 'row',
        alignItems:'center'
      }}>
        <Text style={{
          fontSize: 20,
        color:"black"}}>Events</Text>
        <Text style={{
          marginLeft: 10,
        fontSize:20}}>10</Text>
        </View>
        <TouchableOpacity onPress={()=>{}}><Text style={{fontSize:20,color:'black', letterSpacing:1}}>SeeAll</Text></TouchableOpacity>

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

import React from 'react'
import { Pressable, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';
function Home() {
  const navigation = useNavigation();
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }}>
      <View>
      <Pressable onPress={() => navigation.navigate("Login")} >
        <Text>Please Login</Text>
      </Pressable>
      </View>
   </View>
  )
}

export default Home

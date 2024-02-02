import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function Account({navigation}) {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }}>

    {/* <Pressable onPress={() => navigation.navigate("Login")} > */}
        <Text>Account</Text>
      {/* </Pressable> */}
    </View>
    
  )
}

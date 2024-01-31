import React from 'react'
import { Pressable, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native';
function OnboardingScreen() {
  const navigation = useNavigation()
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
      }}>
      <Pressable onPress={() => navigation.navigate("LoginScreen")} >
        <Text>Let's Start</Text>
      </Pressable>
    </View>
  )
}

export default OnboardingScreen
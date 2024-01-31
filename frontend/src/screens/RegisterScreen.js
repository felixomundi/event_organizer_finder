import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/native"
function RegisterScreen() {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {  
      flex: 1,      
      padding: 30,        
      
    },
    title:{
      fontSize: 20,
      fontWeight: "500",
      color:"red"      
    },
    form: {
      flex: 1,
      marginBottom:20,
    },
    input: {
      margin:10
      
    },
    text_input: {
      backgroundColor: "#ffff",
      paddingHorizontal: 15,     
      color: "black",
      fontSize: 20,
      fontWeight: "500",
      height: 44,
      borderRadius:12
    },
    input_label: {
      marginBottom:10
    },
    form_action: {
      marginBottom:20
    },
    btn: {
      backgroundColor: 'yellow',
      borderRadius: 8,
      borderWidth: 1,
      borderColor:'yellow',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      marginTop: 5,
      paddingHorizontal:20
    },
    btn_text: {
      fontSize: 20,
      color: 'black',
      fontWeight:'600'
    },
    form_footer: {
      fontSize: 20,
      fontWeight: '600',
      color: 'black',
      textAlign: 'center',
      
    },
    
  })
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <View style={styles.container}>
        <View style={{
          marginVertical:30
        }}>
          <Text style={styles.title}>Please Create A new Account</Text>
        </View>
        <View style={styles.form}>
        <View style={styles.input}>
            <Text style={styles.input_label}>Name</Text>
            <TextInput style={styles.text_input} placeholder='john doe'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
            ></TextInput>
          </View>
          <View style={styles.input}>
            <Text style={styles.input_label}>Email Address</Text>
            <TextInput style={styles.text_input} placeholder='john.doe@example.com'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
            ></TextInput>
          </View>

          <View style={styles.input}>
            <Text style={styles.input_label}>Password</Text>
            <TextInput secureTextEntry style={styles.text_input} placeholder='********'></TextInput>
          </View>
          <View style={styles.form_action}>
            <TouchableOpacity onPress={() => {
              
            }}>
              <View style={styles.btn}>
                <Text style={styles.btn_text}>Sign Up</Text>
              </View>
            </TouchableOpacity>

          </View>
          <TouchableOpacity onPress={() => {
            navigation.navigate("LoginScreen")
          }} style={{
            marginTop:'auto'
          }}>
            <Text style={styles.form_footer}>Already have an account? {" "}
            <Text style={{textDecorationLine:'underline'}}>Sign In</Text>
            </Text>

          </TouchableOpacity>

        </View>


    </View>
   </SafeAreaView>
  )
}


export default RegisterScreen;
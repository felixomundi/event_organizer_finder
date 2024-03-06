import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../utils';
import Loader from "./../components/Loader"
import { logout, register, reset } from '../redux/slices/auth';

function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, user, message } = useSelector(state => state.auth);
  useEffect(() => {
    if (user && user.email) {
      navigation.navigate('HomePage');
    } else {
      dispatch(logout())
    } if (message) {
      alert(message)
    }
    dispatch(reset())
  },[user, navigation,dispatch])
  const onPress = () => {
    if (!name) {
      return alert("Please add user name");
    }
    if (!email) {
      return alert("Please add an email address");
    }
    if (!validateEmail(email)) {
      return alert("Invalid email address");
    }
    if (!password || !confirm_password) {
      return alert("Please add both password and confirm password");
    }
    if (password.length < 6 ) {
      return alert("Password should not be less than 6 characters");
    }
    if (confirm_password.length < 6 ) {
      return alert("Password should not be less than 6 characters");
    }
    if (password !== confirm_password) {
      return alert("Passwords do not match");
    }
    const data = {
      name,email,password
    }
    dispatch(register(data));
  };
  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Please Create A new Account</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder='Your Name'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={text => setName(text)}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder='Your Email Address'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              autoCapitalize='none'
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              autoCapitalize='none'
              secureTextEntry
              value={confirm_password}
              onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity onPress={onPress}>
              <View style={styles.btn}>
                <Text style={styles.btn_text}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.footer}>
        <Text style={styles.form_footer}>Already have an account? <Text style={styles.signin_text}>Sign In</Text></Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFA500'
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffff",
    paddingHorizontal: 15,
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    height: 44,
    borderRadius: 12,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: 'yellow',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  btn_text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  form_footer: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  signin_text: {
    textDecorationLine: 'underline',
    color:'red',
  },
});

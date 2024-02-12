import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from '../utils';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, reset } from '../redux/slices/auth';
import Loader from '../components/Loader';

function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, user, token, message } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && user.email) {
      navigation.navigate("HomePage");
    } else {
      dispatch(logout());
    }
    if (message) {
      alert(message);
    }
    dispatch(reset());
  }, [dispatch, message, user, navigation]);

  const onPress = async () => {
    if (!email) {
      return alert("Please add an email address");
    }
    if (!validateEmail(email)) {
      return alert("Invalid email address");
    }
    if (!password) {
      return alert("Please Add Password");
    }
    const data = {
      email,
      password
    };
    dispatch(login(data));
  };

  if (isLoading) {
    return <Loader />;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: "500",
      color: "red"
    },
    form: {
      flex: 1,
      marginBottom: 20,
    },
    input: {
      margin: 10
    },
    text_input: {
      backgroundColor: "#ffff",
      paddingHorizontal: 15,
      color: "black",
      fontSize: 20,
      fontWeight: "500",
      height: 44,
      borderRadius: 12
    },
    input_label: {
      marginBottom: 10
    },
    form_action: {
      marginBottom: 20
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
      marginTop: 5,
      paddingHorizontal: 20
    },
    btn_text: {
      fontSize: 20,
      color: 'black',
      fontWeight: '600'
    },
    form_footer: {
      fontSize: 20,
      fontWeight: '600',
      color: 'black',
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ marginVertical: 30 }}>
          <Text style={styles.title}>Please Sign in</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.input_label}>Email Address</Text>
            <TextInput
              style={styles.text_input}
              placeholder='john.doe@gmail.com'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.input_label}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.text_input}
              placeholder='********'
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.form_action}>
            <TouchableOpacity onPress={onPress}>
              <View style={styles.btn}>
                <Text style={styles.btn_text}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} style={{ marginTop: 'auto' }}>
            <Text style={styles.form_footer}>
              Don't have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

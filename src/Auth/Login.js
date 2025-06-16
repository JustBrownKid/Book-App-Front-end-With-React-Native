import React, { useState } from 'react';
import  {API_URL}  from '@env';
import axios from 'axios';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');


  const handleLogin = async () => {
    let valid = true;
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    setEmailError('Email is required');
    valid = false;
  } else if (!emailRegex.test(email.trim())) {
    setEmailError('Invalid email format');
    valid = false;
  } else {
    setEmailError('');
  }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

   
try {
  const response = await axios.post(`${API_URL}/login`, {
    email: email,
    password: password,
  });
  setLoading(false);
  navigation.navigate('Otp', { email });
} catch (error) {
  console.error('Login error:', error);
  setLoading(false);

  if (error.response?.data?.message) {
    // if backend sends { message: "something went wrong" }
    setServerError(error.response.data.message);
  } else {
    setServerError('Network error. Please check your connection or server.');
  }
}
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>WELCOME</Text>
      {serverError ? (
      <Text style={styles.serverError}>{serverError}</Text>
    ) : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#14213d"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (text) setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#14213d"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text) setPasswordError('');
              }}
              secureTextEntry
            />
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Go to Register</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#5e70a1',
  },
  title: {
    color: '#14213d',
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#eee7d7',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#14213d',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    color: '#000',
  },
  error: {
    color: '#ff4d4d',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#14213d',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#14213d',
    fontWeight: 'bold', // fixed typo
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  serverError: {
    color: '#ff4d4d',
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Login;

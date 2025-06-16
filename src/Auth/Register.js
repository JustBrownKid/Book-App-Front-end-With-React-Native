import React, { useState,useEffect, use} from 'react';
import { useNavigation } from '@react-navigation/native';
import  {API_URL}  from '@env';

import axios from 'axios';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator
} from 'react-native';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');


  const handleRegister = async () => {
    let valid = true;
    setLoading(true);
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      return; 
    }

try {
  const response = await axios.post(`${API_URL}/register`, {
    userName: username,
    email: email,
    password: password,
    confirm_password: confirmPassword,
  });
  setLoading(false);
  navigation.navigate('Login');
} catch (error) {
  console.error('Registration error:', error);
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Register</Text>
            {serverError ? (
  <Text style={styles.serverError}>{serverError}</Text>
) : null}

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#14213d"
              value={username}
              onChangeText={setUsername}
            />
            {errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#14213d"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#14213d"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#14213d"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              {loading ? (
                              <ActivityIndicator size="small" color="#fff" />
                            ) : (
                              <Text style={styles.buttonText}>Register</Text>
                            )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Go to Login</Text>
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
    borderWidth: 1,       // ← Required to show the border
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#000',             // Optional: for text color
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
    fonrtWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  error: {
    color: '#ff4d4d',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 13,
  },
  serverError: {
  color: '#ff4d4d',
  marginTop: 5,
  fontSize: 14,
  textAlign: 'center',
},

});

export default Register;

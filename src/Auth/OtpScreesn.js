import React, { useRef, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {API_URL}  from '@env';

import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';

const OTPScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputs = useRef([]);
  const { email } = route.params;

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const showToast = (type, text1, text2 = '') => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 3000,
    });
  };

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 4) {
        inputs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 5) {
      showToast('error', 'Invalid OTP', 'Please enter a 5-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/otp/verify`,
        { email, otp: code },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setLoading(false);
      if (response.data.success) {
        const token = response.data.data.token;
         await AsyncStorage.setItem('userToken', token);
        showToast('success', 'OTP Verified', 'Redirecting...');
          setTimeout(() => {
            navigation.navigate('Home');
          }, 1500);
      } else {
        showToast('error', 'OTP Failed', response.data.message || 'Invalid OTP');
        setOtp(['', '', '', '', '']);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setLoading(false);
      showToast('error', 'Error', 'Something went wrong. Try again.');
      setOtp(['', '', '', '', '']);
    }
  };

  const handleResend = async () => {
    setOtp(['', '', '', '', '']);
    setResendTimer(60);

    try {
      const response = await axios.post(
        `${API_URL}/otp/resend`,
        { email }
      );

      if (response.data.success) {
        showToast('success', 'OTP Resent', `Sent to ${email}`);
      } else {
        showToast('error', 'Error', response.data.message || 'Could not resend OTP.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      showToast('error', 'Error', 'Failed to resend OTP.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.text}>
              OTP has been sent{'\n'}to: <Text style={styles.bold}>{email}</Text>
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === 'Backspace' &&
                      otp[index] === '' &&
                      index > 0
                    ) {
                      inputs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleVerify}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={resendTimer === 0 ? handleResend : null}
              disabled={resendTimer !== 0}
            >
              <Text
                style={[
                  styles.resend,
                  { color: resendTimer === 0 ? '#14213d' : '#888' },
                ]}
              >
                {resendTimer === 0
                  ? 'Resend OTP'
                  : `Resend OTP in ${resendTimer}s`}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#5e70a1',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: '#ccc',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 25,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  otpInput: {
    backgroundColor: '#eee7d7',
    color: '#14213d',
    fontWeight: '800',
    width: 55,
    height: 55,
    textAlign: 'center',
    fontSize: 22,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#14213d',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  resend: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default OTPScreen;

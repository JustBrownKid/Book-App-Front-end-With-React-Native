// components/LogoutButton.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const LogoutButton = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Logout" color="#d62828" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,

  },
});

export default LogoutButton;

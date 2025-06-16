// components/UserInfoCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfoCard = ({ decodedToken }) => {
  if (!decodedToken) {
    return <Text>Loading decoded token...</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.text}>User Name: {decodedToken.userName}</Text>
      <Text style={styles.text}>Email: {decodedToken.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default UserInfoCard;

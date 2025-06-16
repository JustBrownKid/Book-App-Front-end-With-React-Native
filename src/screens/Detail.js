import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Detail = ({ route }) => {
  const { item } = route.params;

  // Sample PDF text (you can replace this with actual extracted content)
  const pdfText = `
    “All animals are equal, but some animals are more equal than others.”
    - From Animal Farm by George Orwell

    Chapter 1:
    Mr. Jones, of the Manor Farm, had locked the hen-houses for the night...
    (continued...)

    Chapter 2:
    Three nights later old Major died peacefully in his sleep. His body was buried...
    (continued...)

    Chapter 3:
    The pigs now revealed that during the past three months they had taught themselves to read and write...
    (continued...)
  `;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Book Info Card */}
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>by {item.author}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#f1c40f" />
              <Ionicons name="star" size={16} color="#f1c40f" />
              <Ionicons name="star" size={16} color="#f1c40f" />
              <Ionicons name="star-half" size={16} color="#f1c40f" />
              <Ionicons name="star-outline" size={16} color="#f1c40f" />
              <Text style={styles.ratingText}> 3.5</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{item.description}</Text>

        {/* Options */}
        <Text style={styles.copyText}>Options</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.buttonRead]}>
            <Ionicons name="book-outline" size={16} color="#fff" />
            <Text style={styles.buttonTextWhite}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonDownload]}>
            <Ionicons name="cloud-download-outline" size={16} color="#fff" />
            <Text style={styles.buttonTextWhite}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonShare]}>
            <Ionicons name="share-social-outline" size={16} color="#fff" />
            <Text style={styles.buttonTextWhite}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* PDF Text View */}
        <Text style={styles.copyText}>Preview PDF</Text>
        <Text style={styles.pdfText}>{pdfText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 140,
    height: 210,
    borderRadius: 10,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  author: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginVertical: 12,
  },
  copyText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonDownload: {
    backgroundColor: '#27ae60',
  },
  buttonRead: {
    backgroundColor: '#2980b9',
  },
  buttonShare: {
    backgroundColor: '#8e44ad',
  },
  buttonTextWhite: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: 'bold',
  },
  pdfText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginTop: 12,
  },
});

export default Detail;

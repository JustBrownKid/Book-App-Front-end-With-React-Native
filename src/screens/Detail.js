import React from 'react';
import { books } from '../data/books';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Detail = ({ route, navigation }) => {
  const { item } = route.params;

  // Render each book in the list as a tappable item that navigates to its detail
  const renderBookItem = ({ item: book }) => (
    <TouchableOpacity
      style={styles.similarBookCard}
      activeOpacity={0.7}
      onPress={() => navigation.push('Detail', { item: book })}
    >
      <Image source={{ uri: book.image }} style={styles.similarBookImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Book Header */}
        <View style={styles.header}>
          <Image source={{ uri: item.image }} style={styles.bookImage} />
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>by {item.author}</Text>

            {/* Star Rating */}
            <View style={styles.ratingContainer}>
              {[...Array(3)].map((_, i) => (
                <Ionicons key={i} name="star" size={16} color="#f1c40f" />
              ))}
              <Ionicons name="star-half" size={16} color="#f1c40f" />
              <Ionicons name="star-outline" size={16} color="#f1c40f" />
              <Text style={styles.ratingText}> 3.5</Text>
            </View>

            {/* Extra Info */}
            <View style={styles.extraInfo}>
              <Text style={styles.infoText}>Language: {item.language}</Text>
              <Text style={styles.infoText}>Pages: {item.page}</Text>
              <Text style={styles.infoText}>Tags: {item.tags?.join(', ')}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <ActionButton icon="book-outline" label="Read" style={styles.readButton} />
          <ActionButton icon="cloud-download-outline" label="Download" style={styles.downloadButton} />
          <ActionButton icon="share-social-outline" label="Share" style={styles.shareButton} />
        </View>

        {/* Similar Books */}
        {books.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Similar Books</Text>
            <FlatList
              data={books}
              renderItem={renderBookItem}
              keyExtractor={(book) => book.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarBooksList}
            />
          </>
        )}

        {/* Books You May Like */}
        {books.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Books You May Like</Text>
            <FlatList
              data={books}
              renderItem={renderBookItem}
              keyExtractor={(book) => book.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarBooksList}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const ActionButton = ({ icon, label, style }) => (
  <TouchableOpacity style={[styles.actionButton, style]} activeOpacity={0.7}>
    <Ionicons name={icon} size={16} color="#fff" />
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bookImage: {
    width: 130,
    height: 200,
    borderRadius: 10,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2c3e50',
    lineHeight: 22,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#333',
  },
  extraInfo: {
    marginTop: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 5,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  readButton: {
    backgroundColor: '#2980b9',
  },
  downloadButton: {
    backgroundColor: '#27ae60',
  },
  shareButton: {
    backgroundColor: '#8e44ad',
  },
  actionButtonText: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: 'bold',
  },
  similarBooksList: {
    paddingVertical: 8,
  },
  similarBookCard: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
  },
  similarBookImage: {
    width: 100,
    height: 150,
    borderRadius: 6,
  },
});

export default Detail;

import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {mainColor, textColor, width, height} from '../../configs/global';

export default function BookCard(props) {
  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container}>
      <Image
        source={{
          uri: props.book.cover,
        }}
        style={styles.bookCover}
        resizeMode="contain"
      />
      <Text style={styles.bookName}>{props.book.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // marginVertical: 0.1 * height,
  },
  bookCover: {
    width: 0.35 * width,
    height: 0.3 * height,
    borderRadius: 0.01 * width,
  },
  bookName: {
    color: '#333',
    marginTop: 0.02 * height,
  },
});

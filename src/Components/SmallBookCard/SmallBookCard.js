import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {mainColor, textColor, width, height} from '../../configs/global';

export default function SmallBookCard(props) {
  return (
    <TouchableOpacity activeOpacity={0.2} style={styles.container} onPress={props.navigate}>
      <Image
        source={
          props.book.posterURL
            ? {
                uri: props.book.posterURL,
              }
            : require('../../../assets/images/bookCover.jpg')
        }
        style={styles.bookCover}
        resizeMode="cover"
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
    color: mainColor,
    marginTop: 0.02 * height,
    fontFamily: 'Cairo-SemiBold',
  },
});

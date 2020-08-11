import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {width, height, mainColor} from '../../configs/global';
export default function AuthorCard(props) {
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={props.navigation}>
      <View style={styles.container}>
        <Image style={styles.Img} source={{uri: props.author.avatarURL}} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.authorName}>
          {props.author.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0.25 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Img: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: 0.1 * width,
  },
  authorName: {
    fontFamily: 'Cairo',
    color: mainColor,
    marginVertical: 0.01 * height,
    textAlign: 'center',
  },
});

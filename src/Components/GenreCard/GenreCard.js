import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import {width, height, textColor} from '../../configs/global';

export default function GenreCard(props) {
  return (
    <TouchableOpacity activeOpacity={0.2}>
      <View style={styles.container}>
        <Image
          source={
            props.genre.photoURL
              ? {
                  uri: props.genre.photoURL,
                }
              : require('../../../assets/images/bookCover.jpg')
          }
          style={styles.genreCover}
          resizeMode="cover"
        />
        <View style={styles.nameView}>
          <Text style={styles.genreName}>{props.genre.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
  genreCover: {
    width: 0.35 * width,
    height: 0.1 * height,
    borderRadius: 0.03 * width,
    // opacity:0.3
  },
  genreName: {
    alignSelf: 'center',
    color: textColor,
    marginTop: 0.02 * height,
    fontFamily: 'Cairo-SemiBold',
    // fontWeight: 'bold',
  },
  nameView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 0.03 * width,
  },
});

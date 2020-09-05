import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {mainColor, textColor, width, height} from '../../configs/global';
import {Icon} from 'native-base';

export default function SmallBookCard(props) {
  useEffect(() => {
    console.log('Small Book Props : ', props);
  });

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      style={styles.container}
      onPress={props.navigate}>
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
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.bookName}>
        {props.book.name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.authorName}>
        {props.book.author ? props.book.author.name : null}
      </Text>
      <View style={styles.bookRateView}>
        <Text style={styles.rateText}>{props.book.rate || 2.5} / 5</Text>
        <Icon name="star" type="Ionicons" style={styles.rateIcon} />
      </View>
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
    borderRadius: 0.05 * width,
  },
  bookName: {
    color: mainColor,
    marginTop: 0.02 * height,
    fontFamily: 'Cairo-SemiBold',
    width: 0.35 * width,
    textAlign: 'center',
  },
  authorName: {
    color: 'grey',
    fontFamily: 'Cairo',
    width: 0.35 * width,
    textAlign: 'center',
    fontSize: 0.03 * width,
  },
  bookRateView: {
    flexDirection: 'row',
    marginTop: 0.01 * height,
  },
  rateText: {
    color: '#f69453',
    fontSize: 0.04 * width,
    marginHorizontal: 0.01 * width,
  },
  rateIcon: {
    color: '#f69453',
    fontSize: 0.05 * width,
  },
});

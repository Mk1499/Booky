import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {mainColor, textColor, width, height} from '../../configs/global';
import {connect} from 'react-redux';
import I18n, {getActiveLang} from '../../translate';
import dummyCover from '../../../assets/images/bookCover.jpg'

function BookCard(props) {
  let {book} = props;
  let name = book.enName && I18n.locale === 'en-US' ? book.enName : book.name;
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
            : dummyCover
        }
        style={styles.bookCover}
        resizeMode="cover"
        defaultSource={dummyCover}
      />
      <Text style={styles.bookName} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>
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
    textAlign: 'center',
    width: 0.35 * width,

    // fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(BookCard);

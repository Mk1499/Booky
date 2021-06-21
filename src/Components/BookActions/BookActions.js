import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import {setCurrentRead} from '../../actions/book';
import {client} from '../../queries/queryClient';
import {checkBookRead} from '../../queries/book';
import I18n from '../../translate';
import {styles} from './styles';

function BookActions(props) {
  async function readBook() {
    await client
      .query({
        query: checkBookRead,
        variables: {
          userID: props.userID,
          bookID: props.book.id,
        },
        fetchPolicy: 'no-cache',
      })
      .then((res) => {
        let lastPage = 1;
        if (res.data.checkBookRead.length) {
          lastPage = res.data.checkBookRead[0].lastPage;
        }
        let readData = {
          book: props.book,
          lastPage: lastPage,
        };

        props.setCurrentRead(readData);

        props.navigation.navigate('PDF', {
          url: props.book.readURL,
        });
      })
      .catch((err) => {
        // console.log('cecking book read Err : ', err);
      });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.Btn, styles.leftBtn]}
        onPress={() => {
          props.addComment();
        }}>
        <Icon name="rate-review" type="MaterialIcons" style={styles.icon} />
        <Text style={styles.text}>{I18n.t('addComment')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Btn, styles.rightBtn]}
        onPress={readBook}>
        <Icon name="ios-reader-outline" type="Ionicons" style={styles.icon} />

        <Text style={styles.text}>{I18n.t('readBook')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
});

export default connect(mapStateToProps, {setCurrentRead})(BookActions);

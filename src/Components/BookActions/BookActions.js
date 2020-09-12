import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {width, height} from '../../configs/global';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import {setCurrentRead} from '../../actions/book';
import {client} from '../../queries/queryClient';
import {checkBookRead} from '../../queries/book';

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
      .then(res => {
        console.log('checking book read res : ', res.data);
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
      .catch(err => {
        console.log('ehcecking book read Err : ', err);
      });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.Btn, styles.leftBtn]} onPress={readBook}>
        <Icon name="ios-reader-outline" type="Ionicons" style={styles.icon} />

        <Text style={styles.text}>Read Book Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.Btn, styles.rightBtn]}>
        <Icon name="md-library-outline" type="Ionicons" style={styles.icon} />
        <Text style={styles.text}>Add To Library</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0.8 * width,
    height: 0.09 * height,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    elevation: 10,
  },
  Btn: {
    width: 0.4 * width,
    flexDirection: 'row',
    borderColor: '#fff',
    backgroundColor: '#201f2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBtn: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 1,
  },
  leftBtn: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    fontFamily: 'Cairo',
    color: '#eee',
    fontSize: 0.035 * width,
  },
  icon: {
    color: '#eee',
    marginHorizontal: 0.01 * width,
  },
});

const mapStateToProps = state => ({
  userID: state.auth.userID,
});

export default connect(mapStateToProps, {setCurrentRead})(BookActions);

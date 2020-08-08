import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {
  width,
  height,
  mainColor,
  textColor,
  subColor,
} from '../../configs/global';
import SubHeader from '../../Components/SubHeader/SubHeader';
import BookActions from '../../Components/BookActions/BookActions';
import {useQuery} from '@apollo/client';
import {getBookDetails} from '../../queries/queries';

export default function BookDetails(props) {
  function goBack() {
    props.navigation.goBack();
  }

  const [book, setBook] = useState({});
  let bookID = props.navigation.state.params.bookID;
  useQuery(getBookDetails, {
    variables: {id: bookID},
    onCompleted: data => {
      console.log('Book Data : ', data, bookID);
      setBook(data.book);
    },
    onError: err => {
      console.log('Getting a book details Error : ', err);
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.firstHalf}>
        <SubHeader goBack={goBack} />
        <View style={styles.coverView}>
          <Image
            source={
              book.posterURL
                ? {uri: book.posterURL}
                : require('../../../assets/images/bookCover.jpg')
            }
            style={styles.bookCover}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.bookName}>{book.name}</Text>
        <Text style={styles.authorName}>
          {book.author ? book.author.name : ''}
        </Text>
        <View style={styles.bookData}>
          <View>
            <Text style={styles.head}>Rating</Text>
            <Text style={styles.data}>{book.rate || 0}</Text>
          </View>
          <View>
            <Text style={styles.head}>Pages</Text>
            <Text style={styles.data}>{book.pages || 'N/A'}</Text>
          </View>
          <View>
            <Text style={styles.head}>Language</Text>
            <Text style={styles.data}>{book.language || 'AR'}</Text>
          </View>
          <View>
            <Text style={styles.head}>Reads</Text>
            <Text style={styles.data}>{book.reads || 0}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bookActionCont}>
        <BookActions />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  firstHalf: {
    height: 0.7 * height,
    backgroundColor: mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCover: {
    width: 0.4 * width,
    height: 0.3 * height,
    borderRadius: 20,
  },
  coverView: {
    elevation: 20,
    borderRadius: 20,

    backgroundColor: mainColor,
  },
  bookName: {
    color: textColor,
    fontFamily: 'Cairo-Bold',
    marginVertical: 0.01 * height,
    fontSize: 0.06 * width,
  },
  authorName: {
    fontFamily: 'Cairo',
    color: subColor,
    fontSize: 0.035 * width,
  },
  bookActionCont: {
    marginTop: -0.045 * height,
    alignItems: 'center',
  },
  bookData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 0.9 * width,
    paddingHorizontal: 0.05 * width,
    marginVertical: 0.03 * height,
  },
  head: {
    fontFamily: 'Cairo',
    color: textColor,
    alignSelf: 'center',
    fontSize: 0.03 * width,
  },
  data: {
    fontFamily: 'Cairo-Bold',
    color: textColor,
    alignSelf: 'center',
    fontSize: 0.04 * width,
  },
});

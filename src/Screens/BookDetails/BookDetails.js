import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  width,
  height,
  mainColor,
  textColor,
  subColor,
} from '../../configs/global';
import SubHeader from '../../Components/SubHeader/SubHeader';
import BookActions from '../../Components/BookActions/BookActions';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import {useQuery} from '@apollo/client';
import {getBookDetails} from '../../queries/queries';

export default function BookDetails(props) {
  const [book, setBook] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  let bookID = props.navigation.state.params.bookID;
  const {refetch} = useQuery(getBookDetails, {
    variables: {id: bookID},
    onCompleted: data => {
      console.log('Book Data : ', data, bookID);
      setBook(data.book);
      setRefreshing(false);
    },
    onError: err => {
      console.log('Getting a book details Error : ', err);
    },
    notifyOnNetworkStatusChange: true,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    refetch();
  }, []);

  function goBack() {
    props.navigation.goBack();
  }

  function gotoBookScreen(bookID) {
    props.navigation.push('BookDetails', {
      bookID,
    });
  }

  function renderRelBooks({item}) {
    if (item.id !== book.id)
      return (
        <View style={styles.bookItem}>
          <SmallBookCard
            book={item}
            key={item.id}
            navigate={() => gotoBookScreen(item.id)}
          />
        </View>
      );
    else return null;
  }

  function gotoAuthorScreen(author) {
    props.navigation.navigate('AuthorProfile', {
      author,
    });
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.headCont}>
        <SubHeader goBack={goBack} />
      </View>
      <View style={styles.firstHalf}>
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
        <Text
          style={styles.authorName}
          onPress={() => {
            if (book.author) {
              gotoAuthorScreen(book.author);
            }
          }}>
          {book.author ? book.author.name : ''}
        </Text>
        <View style={styles.bookData}>
          <View>
            <Text style={styles.head}>Rating</Text>
            <Text style={styles.data}>{book.rate || 0} / 5</Text>
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
          <View>
            <Text style={styles.head}>Release Year</Text>
            <Text style={styles.data}>{book.releaseYear || 2020}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bookActionCont}>
        <BookActions />
      </View>
      <View style={styles.secHalf}>
        <View style={styles.section}>
          <Text style={styles.desc}>{book.description}</Text>
        </View>
        {book.relatedBooks && book.relatedBooks.length > 1 ? (
          <View style={styles.section}>
            <Text style={styles.sideHeader}>Related Books</Text>
            <FlatList
              data={book.relatedBooks}
              renderItem={renderRelBooks}
              horizontal
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  headCont: {
    backgroundColor: mainColor,
  },
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
    marginTop: -0.1 * height,
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
  secHalf: {},
  section: {
    marginVertical: 0.03 * height,
    paddingHorizontal: 0.05 * width,
  },
  desc: {
    fontFamily: 'Cairo',
    textAlign: 'center',
  },
  bookItem: {
    marginHorizontal: 0.02 * width,
  },
  sideHeader: {
    color: mainColor,
    fontSize: 0.06 * width,
    fontFamily: 'Cairo-SemiBold',
    marginBottom: 0.03 * height,
  },
});

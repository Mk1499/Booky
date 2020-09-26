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
import ShelfsModal from '../../Components/ShelfsModal/ShelfsModal';
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
import {connect} from 'react-redux';
import {addBookToFav} from '../../actions/book';
import {checkBookFavQuery} from '../../queries/book';
import {
  addBookToFavMutation,
  removeBookFromFavMutation,
} from '../../mutations/book';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {baseURL} from '../../configs/global';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

function BookDetails(props) {
  const [book, setBook] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [favState, setFavState] = React.useState(false);
  const [favID, setFavID] = React.useState('');
  const [modalVisiable, setModalVisiable] = React.useState(false);
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

  useEffect(() => {
    client
      .query({
        query: checkBookFavQuery,
        variables: {
          userID: props.userID,
          bookID: bookID,
        },
        fetchPolicy: 'no-cache',
      })
      .then(res => {
        console.log('checking fav res : ', res);
        let data = res.data;
        if (data.checkBookFav) {
          setFavState(true);
          setFavID(data.checkBookFav.id);
        }
      })
      .catch(err => {
        console.log('checking fav state err : ', err);
      });
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

  function addToFav() {
    // props.addBookToFav(props.userID, book.id);
    console.log(
      'adding Book with id : ',
      book.id,
      ' for user with ID : ',
      props.userID,
    );
    client
      .mutate({
        mutation: addBookToFavMutation,
        variables: {
          userID: props.userID,
          bookID: book.id,
        },
      })
      .then(res => {
        console.log('book fav res : ', res);
        setFavID(res.data.addBookFav.id);
      })
      .catch(err => {
        console.log('add to fav error : ', err);
      });
  }

  function removeFromFav() {
    console.log('FAVID : ', favID);

    client
      .mutate({
        mutation: removeBookFromFavMutation,
        variables: {
          id: favID,
        },
      })
      .then(res => {})
      .catch(err => {
        console.log('remove from fav err : ', err);
      });
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {book.posterURL ? (
        <Image source={{uri: book.posterURL}} style={styles.backgroundImg} />
      ) : null}
      <View style={styles.headCont}>
        <SubHeader
          state={favState}
          goBack={goBack}
          changeFav={favState ? removeFromFav : addToFav}
        />
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
        <BookActions
          book={book}
          navigation={props.navigation}
          viewModal={() => {
            // alert('called');
            setModalVisiable(true);
          }}
        />
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
      <ShelfsModal
        visible={modalVisiable}
        hideModal={() => setModalVisiable(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  headCont: {
    backgroundColor: 'rgba(254,44,84,0.8)',
  },
  firstHalf: {
    height: 0.6 * height,
    backgroundColor: 'rgba(254,44,84,0.8)',
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
    fontFamily: 'Cairo-Bold',
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
    marginTop: 0.03 * height,
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
  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    width,
    height: 0.7 * height,
    opacity: 0.8,
  },
});

const mapStateToProps = state => ({
  userID: state.auth.userID,
});

export default connect(mapStateToProps, {addBookToFav})(BookDetails);

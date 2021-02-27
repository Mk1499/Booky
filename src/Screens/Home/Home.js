import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header/Header';
import {mainColor} from '../../configs/global';
import BookCard from '../../Components/BookCard/BookCard';
import GenreCard from '../../Components/GenreCard/GenreCard';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import AddBookBtn from '../../Components/AddBookBtn/AddBookBtn';
import Carousel from 'react-native-anchor-carousel';
import {
  getBooksQuery,
  getLatestBooksQuery,
  getGenresQuery,
  getAuthorsQuery,
} from '../../queries/queries';
import {useQuery} from '@apollo/client';
import {
  backgroundMsgs,
  forgroundMsgs,
  requestUserPermission,
} from '../../Services/firebaseMessaging';

import {setAuthors as setAuthorsAction} from '../../actions/author';
import {setGenres as setGenresAction} from '../../actions/genre';
import {client} from '../../queries/queryClient';

const {width, height} = Dimensions.get('window');

function Home(props) {
  function gotoBookScreen(bookID) {
    props.navigation.navigate('BookDetails', {
      bookID,
    });
  }
  function gotoAddBookScreen() {
    props.navigation.navigate('AddBook', {
      onGoBack: () => getData(),
    });
  }

  function gotoGenreScreen(genreID) {
    props.navigation.navigate('Genre', {
      genreID,
    });
  }

  function gotoAuthorScreen(author) {
    props.navigation.navigate('AuthorProfile', {
      author,
    });
  }

  function renderItem({item}) {
    return <BookCard book={item} navigate={() => gotoBookScreen(item.id)} />;
  }

  function renderLatestBook({item}) {
    return (
      <View style={styles.bookItem}>
        <SmallBookCard
          book={item}
          key={item.id}
          navigate={() => gotoBookScreen(item.id)}
        />
      </View>
    );
  }

  function renderGenreItem({item}) {
    return (
      <View style={styles.bookItem}>
        <GenreCard genre={item} navigation={() => gotoGenreScreen(item.id)} />
      </View>
    );
  }

  function renderAuthorCard({item}) {
    return (
      <View style={styles.bookItem}>
        <AuthorCard author={item} navigation={() => gotoAuthorScreen(item)} />
      </View>
    );
  }

  const [books, setBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getData() {
    setRefreshing(true);
    await refreshBooks();
    await refreshLatestBooks();
    await refreshAuthors();
    setRefreshing(false);
  }

  async function refreshBooks() {
    await client
      .query({
        query: getBooksQuery,
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        setBooks(data.books);
      })
      .catch((err) => {
        console.error('Getting Books Error : ', err);
      });
  }

  async function refreshAuthors() {
    await client
      .query({
        query: getAuthorsQuery,
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        setAuthors(data.authors);
      })
      .catch((err) => {
        console.error('Getting Authors Error : ', err);
      });
  }

  async function refreshLatestBooks() {
    await client
      .query({
        query: getLatestBooksQuery,
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        setLatestBooks(data.books);
      })
      .catch((err) => {
        console.error('Getting Latest Books Error : ', err);
      });
  }

  useEffect(() => {
    requestUserPermission();
    backgroundMsgs();
    forgroundMsgs();
  }, []);

  useEffect(() => {
    props.setAuthorsAction(authors);
  }, [authors]);

  useEffect(() => {
    props.setGenresAction(genres);
  }, [genres]);

  useQuery(getBooksQuery, {
    onCompleted: (data) => {
      setBooks(data.books);
      setRefreshing(false);
    },
    onError: (err) => {
      console.log('Get Books Err : ', err);
      setRefreshing(false);
    },
  });

  useQuery(getAuthorsQuery, {
    onCompleted: (data) => {
      setAuthors(data.authors);
    },
    onError: (err) => {
      console.log('Get Authors Err : ', err);
    },
  });

  useQuery(getLatestBooksQuery, {
    onCompleted: (data) => {
      setLatestBooks(data.books);
    },
    onError: (err) => {
      console.log('Get Latest Books Err : ', err);
    },
  });

  useQuery(getGenresQuery, {
    onCompleted: (data) => {
      setGenres(data.genres);
    },
    onError: (err) => {
      console.log('Get Genres Err : ', err);
    },
  });

  return (
    <View style={styles.container}>
      <Header />
      {books?.length && latestBooks?.length && authors?.length ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                getData();
              }}
              colors={[mainColor]}
              refreshing={refreshing}
            />
          }>
          <View style={styles.roundedBG} />
          <View style={styles.topContent}>
            {books?.length > 0 ? (
              <Carousel
                style={styles.carousel}
                data={books}
                renderItem={renderItem}
                itemWidth={200}
                containerWidth={width}
                separatorWidth={-10}
                // ref={carouselRef}
                initialIndex={1}
                //pagingEnable={false}
                //minScrollDistance={20}
              />
            ) : (
              <ActivityIndicator color={mainColor} size="large" />
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.sideHeader}>New Releases</Text>
            <FlatList
              data={latestBooks}
              horizontal
              renderItem={renderLatestBook}
            />
          </View>
          <View style={styles.genreCont}>
            <FlatList data={genres} horizontal renderItem={renderGenreItem} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sideHeader}>Top Authors</Text>
            <FlatList data={authors} horizontal renderItem={renderAuthorCard} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loadContainer}>
          <Image
            source={require('../../../assets/images/logoAnimated.gif')}
            style={styles.loadImg}
            resizeMode={'contain'}
          />
        </View>
      )}
      <View style={styles.addBtn}>
        <AddBookBtn action={gotoAddBookScreen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 0.9 * height,
  },
  topContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -10,
    height: 0.35 * height,
    width,
    backgroundColor: mainColor,
    borderBottomEndRadius: 0.45 * width,
    borderBottomLeftRadius: 0.45 * width,
  },
  carousel: {
    marginTop: 0.1 * height,
    marginBottom: 0.03 * height,
  },
  section: {
    paddingHorizontal: 0.03 * width,
    marginVertical: 0.03 * height,
  },
  sideHeader: {
    color: mainColor,
    fontSize: 0.06 * width,
    fontFamily: 'Cairo-SemiBold',
    marginBottom: 0.03 * height,
  },
  bookItem: {
    marginHorizontal: 0.02 * width,
  },
  genreCont: {
    marginVertical: 0.03 * height,
  },
  loadContainer: {
    width,
    height: 0.8 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadImg: {
    width: 0.2 * width,
    height: 0.2 * height,
  },
  addBtn: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0.05 * height,
    right: 0.07 * width,
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {setAuthorsAction, setGenresAction})(
  Home,
);

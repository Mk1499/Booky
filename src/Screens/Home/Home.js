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
  I18nManager,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header/Header';
import {mainColor} from '../../configs/global';
import BookCard from '../../Components/BookCard/BookCard';
import GenreCard from '../../Components/GenreCard/GenreCard';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import AddBookBtn from '../../Components/AddBookBtn/AddBookBtn';
// import Carousel from 'react-native-anchor-carousel';
import Carousel from 'react-native-snap-carousel';
import SplashScreen from 'react-native-splash-screen'


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
import {getUserFavsAction} from '../../actions/user';
import {client} from '../../queries/queryClient';
import I18n from '../../translate';
import styles from './styles';
import {getTheme} from '../../Services/themes';
const {width, height} = Dimensions.get('window');

function Home(props) {
  let style = {
    container: {
      ...styles.container,
      backgroundColor: getTheme().background,
    },
  };

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
        // console.log('Books : ', data.books);
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
    props.getUserFavsAction(props.userData.id);
    // console.log('Home Props : ', props);
    SplashScreen.hide();

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
      // console.log('Get Books Err : ', err);
      setRefreshing(false);
    },
  });

  useQuery(getAuthorsQuery, {
    onCompleted: (data) => {
      setAuthors(data.authors);
    },
    onError: (err) => {
      // console.log('Get Authors Err : ', err);
    },
  });

  useQuery(getLatestBooksQuery, {
    onCompleted: (data) => {
      setLatestBooks(data.books);
    },
    onError: (err) => {
      // console.log('Get Latest Books Err : ', err);
    },
  });

  useQuery(getGenresQuery, {
    onCompleted: (data) => {
      setGenres(data.genres);
    },
    onError: (err) => {
      // console.log('Get Genres Err : ', err);
    },
  });

  return (
    <View style={style.container}>
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
                containerCustomStyle={styles.carousel}
                data={books}
                renderItem={renderItem}
                itemWidth={200}
                sliderWidth={width}
                containerWidth={width}
                separatorWidth={-10}
                // ref={carouselRef}
                initialIndex={1}
                autoplay={true}
                autoplayInterval={1000}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                loop={true}
              />
            ) : (
              <ActivityIndicator color={mainColor} size="large" />
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.sideHeader}>{I18n.t('newReleases')}</Text>
            <FlatList
              data={latestBooks}
              horizontal
              renderItem={renderLatestBook}
              contentContainerStyle={styles.hList}
            />
          </View>
          <View style={styles.genreCont}>
            <FlatList
              data={genres}
              horizontal
              renderItem={renderGenreItem}
              contentContainerStyle={styles.hList}
            />
          </View>

          <View style={[styles.section, {marginBottom: 100}]}>
            <Text style={styles.sideHeader}>{I18n.t('topAuthors')}</Text>
            <FlatList
              data={authors}
              horizontal
              renderItem={renderAuthorCard}
              contentContainerStyle={styles.hList}
            />
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

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps, {
  setAuthorsAction,
  setGenresAction,
  getUserFavsAction,
})(Home);

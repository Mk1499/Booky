import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header/Header';
import {mainColor} from '../../configs/global';
import BookCard from '../../Components/BookCard/BookCard';
import GenreCard from '../../Components/GenreCard/GenreCard';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import Carousel from 'react-native-anchor-carousel';
import {
  getBooksQuery,
  getLatestBooksQuery,
  getGenresQuery,
  getAuthorsQuery,
} from '../../queries/queries';
import {useQuery} from '@apollo/client';
const {width, height} = Dimensions.get('window');

function Home(props) {
  function gotoBookScreen(bookID) {
    props.navigation.navigate('BookDetails', {
      bookID,
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
        <AuthorCard
          author={item}
          navigation={() => gotoAuthorScreen(item)}
        />
      </View>
    );
  }

  const [books, setBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    console.log('Home Props : ', props);
  }, []);

  useQuery(getBooksQuery, {
    onCompleted: data => {
      console.log('Data : ', data);
      setBooks(data.books);
    },
    onError: err => {
      console.log('Get Books Err : ', err);
    },
  });

  useQuery(getAuthorsQuery, {
    onCompleted: data => {
      console.log('Data : ', data);
      setAuthors(data.authors);
    },
    onError: err => {
      console.log('Get Authors Err : ', err);
    },
  });

  useQuery(getLatestBooksQuery, {
    onCompleted: data => {
      console.log('Data : ', data);
      setLatestBooks(data.books);
    },
    onError: err => {
      console.log('Get Latest Books Err : ', err);
    },
  });

  useQuery(getGenresQuery, {
    onCompleted: data => {
      console.log('Data : ', data);
      setGenres(data.genres);
    },
    onError: err => {
      console.log('Get Genres Err : ', err);
    },
  });

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.roundedBG} />
        <View style={styles.topContent}>
          {books.length > 0 ? (
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
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Home);

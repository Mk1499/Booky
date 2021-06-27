import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import ShelfsModal from '../../Components/ShelfsModal/ShelfsModal';
import {styles} from './styles';
import SubHeader from '../../Components/SubHeader/SubHeader';
import BookActions from '../../Components/BookActions/BookActions';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import {useQuery} from '@apollo/client';
import {getBookDetails} from '../../queries/queries';
import {connect} from 'react-redux';
import {addBookToFav, updateFavBooksAction} from '../../actions/book';
import {checkBookFavQuery} from '../../queries/book';
import {
  addBookToFavMutation,
  removeBookFromFavMutation,
} from '../../mutations/book';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {baseURL, mainColor} from '../../configs/global';
import I18n from '../../translate';
import {getTheme} from '../../Services/themes';

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
  let bookID = props.route.params.bookID;

  function getDetails() {
    client
      .query({
        query: getBookDetails,
        variables: {
          id: bookID,
        },
      })
      .then(({data}) => {
        setBook(data.book);
        setRefreshing(false);
      });
  }

  useEffect(() => {
    getDetails();
  }, []);

  // const {refetch} = useQuery(getBookDetails, {
  //   variables: {id: bookID},
  //   onCompleted: (data) => {
  //     // console.log('Book Data : ', data, bookID);
  //     setBook(data.book);
  //     setRefreshing(false);
  //   },
  //   onError: (err) => {
  //     // console.log('Getting a book details Error : ', err);
  //   },
  //   notifyOnNetworkStatusChange: true,
  // });

  useEffect(() => {
    checkBookFav();
  }, [props]);

  function checkBookFav() {
    let favBooksIDs = props.favBooksIDs;
    if (favBooksIDs.includes(bookID)) {
      setFavState(true);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // refetch();
    getDetails();
  }, []);

  function goBack() {
    props.navigation.goBack();
  }

  function gotoBookScreen(bookID) {
    props.navigation.push('BookDetails', {
      bookID,
    });
  }

  function addComment(book) {
    props.navigation.push('AddBookComment', {
      book,
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
    let {favBooksIDs} = props;
    let newFavBooksIDs = [...favBooksIDs, bookID];
    setFavState(true);
    props.updateFavBooksAction(newFavBooksIDs);

    client
      .mutate({
        mutation: addBookToFavMutation,
        variables: {
          userID: props.userID,
          bookID: book.id,
        },
      })
      .then((res) => {
        // setFavID(res.data.addBookFav.id);
      })
      .catch((err) => {
        // console.log('add to fav error : ', err);
      });
  }

  function removeFromFav() {
    let {favBooksIDs} = props;
    let newFavBooksIDs = favBooksIDs.filter((id) => id !== bookID);
    setFavState(false);
    props.updateFavBooksAction(newFavBooksIDs);

    client
      .mutate({
        mutation: removeBookFromFavMutation,
        variables: {
          userID: props.userID,
          bookID,
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log('remove from fav err : ', err);
      });
  }

  let style = {
    container: {
      ...styles.container,
      backgroundColor: getTheme().background,
    },
    secHalf: {
      ...styles.secHalf,
      backgroundColor: getTheme().background,
    },
    desc: {
      ...styles.desc,
      color: getTheme().text,
    },
  };

  let bookName =
    book.enName && I18n.locale === 'en-US' ? book.enName : book.name;
  let authorName =
    book.author && book?.author.enName && I18n.locale === 'en-US'
      ? book?.author?.enName
      : book?.author?.name;

  return (
    <ScrollView
      style={style.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[mainColor]}
        />
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
        <Text style={styles.bookName}>{bookName}</Text>
        <Text
          style={styles.authorName}
          onPress={() => {
            if (book.author) {
              gotoAuthorScreen(book.author);
            }
          }}>
          {book.author ? authorName : ''}
        </Text>
        <View style={styles.bookData}>
          <View>
            <Text style={styles.head}>{I18n.t('comments')}</Text>
            <Text style={styles.data}>{book.rate || 0}</Text>
          </View>

          <View>
            <Text style={styles.head}>{I18n.t('language')}</Text>
            <Text style={styles.data}>{book.language || 'AR'}</Text>
          </View>
          <View>
            <Text style={styles.head}>{I18n.t('readsNum')}</Text>
            <Text style={styles.data}>
              {Math.round(book.reads?.length / 2) || 0}
            </Text>
          </View>
          <View>
            <Text style={styles.head}>{I18n.t('publisher')}</Text>
            <Text style={styles.data} numberOfLines={1} ellipsizeMode="tail">
              {book.owner?.name}
            </Text>
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
          addComment={() => {
            addComment(book);
          }}
        />
      </View>
      <View style={style.secHalf}>
        <View style={styles.section}>
          <Text style={style.desc}>{book.description}</Text>
        </View>
        {book.relatedBooks && book.relatedBooks.length > 1 ? (
          <View style={styles.section}>
            <Text style={styles.sideHeader}>{I18n.t('relatedBooks')}</Text>
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

const mapStateToProps = (state) => ({
  userID: state.auth.userData.id,
  favBooksIDs: state.book.favBooksIDs,
});

export default connect(mapStateToProps, {addBookToFav, updateFavBooksAction})(
  BookDetails,
);

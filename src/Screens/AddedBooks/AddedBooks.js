import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import SubHeader from '../../Components/SubHeader/SubHeader';
import I18n from '../../translate';
import BookCard from '../../Components/BookCard/BookCard';
// import {getFavBooksQuery} from '../../queries/book';
import {getUserAddedBooksQuery} from '../../queries/user';
import {getTheme} from '../../Services/themes';
import {mainColor} from '../../configs/global';
import {client} from '../../queries/queryClient';

class AddedBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
      refreshing: false,
      userName: '',
      page: 1,
      allBooks: 0,
      gettingNewPage: false,
    };
  }

  componentDidMount() {
    this.getAddedBooks();
    this.setState({
      userName: this.props.route.params.userName,
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderItem = ({item}) => {
    let style = {
      book: {
        ...styles.book,
        backgroundColor: getTheme().background,
      },
    };
    return (
      <View style={style.book}>
        <BookCard book={item} navigate={() => this.gotoBookScreen(item?.id)} />
      </View>
    );
  };

  gotoBookScreen = (bookID) => {
    this.props.navigation.navigate('BookDetails', {
      bookID,
    });
  };

  getAddedBooks = async () => {
    // let {userData} = this.props;
    let {userID} = this.props.route.params;
    let {page} = this.state;

    this.setState({
      refreshing: true,
    });
    await client
      .query({
        query: getUserAddedBooksQuery,
        variables: {
          userID,
          page,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        console.log('Added Books : ', data);
        this.setState({
          loading: false,
          books: [...this.state.books, ...data.userAddedBooks.books],
          refreshing: false,
          allBooks: data.userAddedBooks.allBooksNum,
          gettingNewPage: false,
        });
      })
      .catch((err) => {
        this.setState({
          refreshing: false,
          loading: false,
        });
        console.error('Get Fav Authors Err : ', err);
      });
  };

  getNewPage = () => {
    let {books, allBooks, page, loading} = this.state;
    if (loading) {
      return null;
    }
    if (allBooks > books.length) {
      this.setState(
        {
          page: this.state.page + 1,
          gettingNewPage: true,
        },
        () => {
          this.getAddedBooks();
        },
      );
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  render() {
    let {books, loading, refreshing, userName, gettingNewPage} = this.state;
    let style = {
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    return (
      <View style={style.container}>
        <SubHeader
          noHeart={true}
          title={userName + ' ' + I18n.t('addedBooks')}
          goBack={() => this.goBack()}
        />
        {loading ? (
          <View style={styles.centerView}>
            <ActivityIndicator color={mainColor} size="large" />
          </View>
        ) : books.length ? (
          <ScrollView
            contentContainerStyle={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this.getAddedBooks()}
                colors={[mainColor]}
              />
            }
            onScroll={({nativeEvent}) => {
              console.log('Scroll : ', nativeEvent);
              if (this.isCloseToBottom(nativeEvent)) {
                this.getNewPage();
              }
            }}
            // scrollEventThrottle={400}
            >
            <FlatList
              data={books}
              renderItem={this.renderItem}
              numColumns={2}
              style={styles.list}
            />
            {gettingNewPage && (
              <View>
                <ActivityIndicator color={mainColor} size="large" />
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.centerView}>
            <Text style={styles.msg}>{I18n.t('noAddedBooks')} </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapPropsToState = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapPropsToState, {})(AddedBooks);

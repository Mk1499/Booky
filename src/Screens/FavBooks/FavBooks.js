import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import SubHeader from '../../Components/SubHeader/SubHeader';
import I18n from '../../translate';
import BookCard from '../../Components/BookCard/BookCard';
import {getFavBooksQuery} from '../../queries/book';
import {getTheme} from '../../Services/themes';
import {mainColor} from '../../configs/global';
import {client} from '../../queries/queryClient';

class FavBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getFavBooks();
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
        <BookCard
          book={item.book}
          navigate={() => this.gotoBookScreen(item?.book?.id)}
        />
      </View>
    );
  };

  gotoBookScreen = (bookID) => {
    this.props.navigation.navigate('BookDetails', {
      bookID,
    });
  };

  getFavBooks = async () => {
    let {userData} = this.props;
    console.log('User ID : ', userData.id);
    this.setState({
      refreshing: true,
    });
    await client
      .query({
        query: getFavBooksQuery,
        variables: {
          userID: userData.id,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        console.log('Fav Books : ', data);
        this.setState({
          loading: false,
          books: data.favBooks,
          refreshing: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          refreshing: false,
        });
        console.error('Get Fav Authors Err : ', err);
      });
  };

  render() {
    let {books, loading, refreshing} = this.state;
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
          title={I18n.t('yourFavBooks')}
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
                onRefresh={() => this.getFavBooks()}
                colors={[mainColor]}
              />
            }>
            <FlatList
              data={books}
              renderItem={this.renderItem}
              numColumns={2}
              style={styles.list}
            />
          </ScrollView>
        ) : (
          <View style={styles.centerView}>
            <Text style={styles.msg}>{I18n.t('noFavBooks')} </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapPropsToState = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapPropsToState, {})(FavBooks);

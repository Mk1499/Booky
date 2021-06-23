import React, {Component} from 'react';
import {View, ActivityIndicator, ScrollView, FlatList} from 'react-native';
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
    };
  }

  componentDidMount() {
    this.getFavBooks();
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  renderItem = ({item}) => {
    console.log('Book Item : ', item);
    return (
      <View style={styles.book}>
        <BookCard
          book={item}
          navigate={() => this.gotoBookScreen(item?.id)}
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
    await client
      .query({
        query: getUserAddedBooksQuery,
        variables: {
          userID: userData.id,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        console.log('Added Books : ', data);
        this.setState({
          loading: false,
          books: data.user.addedBooks,
        });
      })
      .catch((err) => {
        this.setState({});
        console.error('Get Fav Authors Err : ', err);
      });
  };

  render() {
    let {books, loading} = this.state;
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
          title={I18n.t('addedBooks')}
          goBack={() => this.goBack()}
        />
        {loading ? (
          <View style={styles.centerView}>
            <ActivityIndicator color={mainColor} size="large" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <FlatList
              data={books}
              renderItem={this.renderItem}
              numColumns={2}
              style={styles.list}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapPropsToState = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapPropsToState, {})(AddedBooks);

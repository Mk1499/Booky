import React, {Component} from 'react';
import {
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import AuthorListItem from '../../Components/AuthorListItem/AuthorListItem';
import SubHeader from '../../Components/SubHeader/SubHeader';
import I18n from '../../translate';
import {getTheme} from '../../Services/themes';
import {client} from '../../queries/queryClient';
import {getFavAuthorsQuery} from '../../queries/author';
import {connect} from 'react-redux';
import {mainColor} from '../../configs/global';

class FavAuthors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      loading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getFavAuthors();
  }

  getFavAuthors = async () => {
    let {userData} = this.props;
    console.log('User ID : ', userData.id);
    this.setState({
      refreshing: true,
    });
    await client
      .query({
        query: getFavAuthorsQuery,
        variables: {
          userID: userData.id,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        console.log('Fav Authors : ', data);
        this.setState({
          loading: false,
          authors: data.favAuthors,
          refreshing: false,
        });
      })
      .catch((err) => {
        console.error('Get Fav Authors Err : ', err);
        this.setState({
          refreshing: false,
          loading: false,
        });
      });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  gotoAuthorScreen(author) {
    this.props.navigation.navigate('AuthorProfile', {
      author,
    });
  }

  renderItem = ({item}) => (
    <AuthorListItem
      author={item.author}
      action={() => this.gotoAuthorScreen(item.author)}
    />
  );

  render() {
    let style = {
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    let {authors, loading, refreshing} = this.state;

    return (
      <View style={style.container}>
        <SubHeader
          noHeart={true}
          title={I18n.t('yourFavAuthors')}
          goBack={() => this.goBack()}
        />
        {loading ? (
          <View style={styles.centerView}>
            <ActivityIndicator color={mainColor} size="large" />
          </View>
        ) : authors.length ? (
          <ScrollView
            contentContainerStyle={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this.getFavAuthors()}
                colors={[mainColor]}
              />
            }>
            <FlatList data={authors} renderItem={this.renderItem} />
          </ScrollView>
        ) : (
          <View style={styles.centerView}>
            <Text style={styles.msg}>{I18n.t('noFavAuthors')} </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapPropsToState = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapPropsToState, {})(FavAuthors);

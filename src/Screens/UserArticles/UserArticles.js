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
import {getUserArticlesQuery} from '../../queries/article';
import {getTheme} from '../../Services/themes';
import {mainColor} from '../../configs/global';
import {client} from '../../queries/queryClient';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';

class UserArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      refreshing: false,
      userName: '',
      page: 1,
      allArticles: 0,
      gettingNewPage: false,
    };
  }

  componentDidMount() {
    this.getAddedArticles();
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
      <ArticleCard article={item} />
    );
  };

  gotoBookScreen = (bookID) => {
    this.props.navigation.navigate('BookDetails', {
      bookID,
    });
  };

  getAddedArticles = async () => {
    // let {userData} = this.props;
    let {userID} = this.props.route.params;
    let {page} = this.state;

    this.setState({
      refreshing: true,
    });
    await client
      .query({
        query: getUserArticlesQuery,
        variables: {
          userID,
          page,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        console.log('User Articles : ', data);
        this.setState({
          loading: false,
          articles: [...this.state.articles, ...data.userAddedArticles.articles],
          refreshing: false,
          allArticles: data.userAddedArticles.allArticlesNum,
          gettingNewPage: false,
        });
      })
      .catch((err) => {
        this.setState({
          refreshing: false,
          loading: false,
        });
        console.error('Get User Articles Err : ', err);
      });
  };

  getNewPage = () => {
    let {articles, allArticles, page, loading} = this.state;
    if (loading) {
      return null;
    }
    if (allArticles > articles.length) {
      this.setState(
        {
          page: this.state.page + 1,
          gettingNewPage: true,
        },
        () => {
          this.getAddedArticles();
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
    let {articles, loading, refreshing, userName, gettingNewPage} = this.state;
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
          title={userName + ' ' + I18n.t('articles')}
          goBack={() => this.goBack()}
        />
        {loading ? (
          <View style={styles.centerView}>
            <ActivityIndicator color={mainColor} size="large" />
          </View>
        ) : articles.length ? (
          <ScrollView
            contentContainerStyle={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this.getAddedArticles()}
                colors={[mainColor]}
              />
            }
            onScroll={({nativeEvent}) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.getNewPage();
              }
            }}
            // scrollEventThrottle={400}
            >
            <FlatList
              data={articles}
              renderItem={this.renderItem}
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

export default connect(mapPropsToState, {})(UserArticles);

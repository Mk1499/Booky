import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import I18n, {getActiveLang} from '../../translate';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';
import BookCard from '../../Components/BookCard/BookCard';
import {getTheme} from '../../Services/themes';
import Loader from '../../Components/Loader/Loader';
import {client} from '../../queries/queryClient';
import {getUserProfileQ} from '../../queries/user';
import {connect} from 'react-redux';
import dummyCover from '../../../assets/images/cover.jpg';
import dummyProfilePic from '../../../assets/images/avatar.jpg';
import {mainColor} from '../../configs/global';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      user: {
        name: '',
        articles: [],
        addedBooks: [],
      },
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let {userID} = this.props.route.params;
    await client
      .query({
        query: getUserProfileQ,
        variables: {
          userID,
        },
        fetchPolicy: 'no-cache',
      })
      .then(({data}) => {
        let {user} = data;
        this.setState({
          user,
          loading: false,
          refreshing: false,
        });
      });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  goToBookScreen = (book) => {
    this.props.navigation.push('BookDetails', {
      bookID: book.id,
    });
  };

  renderArticle = (item) => {
    return <ArticleCard article={item} />;
  };

  renderBook = (item) => {
    return (
      <View style={styles.bookItem}>
        <BookCard book={item} navigate={() => this.goToBookScreen(item)} />
      </View>
    );
  };

  showAddedBooks = () => {
    let {userID} = this.props.route.params;
    let userName = this.state.user.name;
    let {navigation} = this.props;
    navigation.navigate('AddedBooks', {
      userID,
      userName,
    });
  };

  showUserArticles = () => {
    let {userID} = this.props.route.params;
    let userName = this.state.user.name;
    let {navigation} = this.props;
    navigation.navigate('UserArticles', {
      userID,
      userName,
    });
  };

  showUserFollowers = () => {
    let {userID} = this.props.route.params;
    let userName = this.state.user.name;
    let {navigation} = this.props;
    navigation.navigate('UserFollowers', {
      userID,
      userName,
    });
  }

  render() {
    let {refreshing, loading, user} = this.state;

    let style = {
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
      priefRow: {
        ...styles.priefRow,
        flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      },
      sectionHead: {
        ...styles.sectionHead,
        flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      },
      themedFontColor: {
        color: getTheme().text,
      },
    };

    if (loading) {
      return <Loader />;
    }

    return (
      <ScrollView
        contentContainerStyle={style.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.getData}
            colors={[mainColor]}
          />
        }>
        <View style={styles.header}>
          <Icon
            name={
              getActiveLang === 'ar'
                ? 'chevron-thin-right'
                : 'chevron-thin-left'
            }
            type="Entypo"
            style={styles.backIcon}
            onPress={this.goBack}
          />
        </View>
        <Image
          style={styles.cover}
          source={
            user.cover
              ? {
                  uri: user.cover,
                }
              : dummyCover
          }
          defaultSource={dummyCover}
        />
        <View style={styles.headDataCont}>
          <View style={styles.profileImgCont}>
            <Image
              style={styles.profileImg}
              source={user.photo ? {uri: user.photo} : dummyProfilePic}
              defaultSource={dummyProfilePic}
            />
          </View>
          <Text style={[styles.name, style.themedFontColor]}>{user.name}</Text>
          {user.quote ? (
            <View style={styles.quoteCont}>
              <Icon name="quote-left" type="FontAwesome" style={styles.icon} />
              <Text style={styles.quote}>{user.quote}</Text>
              <Icon name="quote-right" type="FontAwesome" style={styles.icon} />
            </View>
          ) : null}
        </View>
        <View style={style.priefRow}>
          <View style={styles.preifCont}>
            <Text style={[styles.preifHead, style.themedFontColor]}>
              {I18n.t('articles')}
            </Text>
            <Text style={styles.priefData}>{user.articlesNum || 0}</Text>
          </View>
          <View style={styles.preifCont}>
            <Text style={[styles.preifHead, style.themedFontColor]}>
              {I18n.t('books')}
            </Text>
            <Text style={styles.priefData}>{user.addedBooksNum || 0}</Text>
          </View>
          <View style={styles.preifCont}>
            <Text style={[styles.preifHead, style.themedFontColor]} onPress={this.showUserFollowers}>
              {I18n.t('followers')}
            </Text>
            <Text style={styles.priefData} onPress={this.showUserFollowers}>{user.followers}</Text>
          </View>
          <View style={styles.preifCont}>
            <Text style={[styles.preifHead, style.themedFontColor]}>
              {I18n.t('following')}
            </Text>
            <Text style={styles.priefData}>{user.following}</Text>
          </View>
        </View>
        {user.id !== this.props.userData.id ? (
          <View style={styles.followBtnCont}>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>{I18n.t('follow')}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {!user?.addedBooks?.length && !user.articles?.length ? 
        
         <View style={styles.noDataCont}>
           <Icon name="file-alert-outline" type="MaterialCommunityIcons" style={styles.noDataIcon} />
           <Text style={styles.noDataMsg}>{I18n.t('noPostsOrBooks')}</Text>
         </View>
        : 
        
        <View>
          <View style={styles.section}>
            <View style={style.sectionHead}>
              <Text style={styles.sectionTitle}>
                {I18n.t('latestArticles')}
              </Text>
              <Text
                style={[styles.showMoreText, style.themedFontColor]}
                onPress={this.showUserArticles}>
                {I18n.t('seeMore')}
              </Text>
            </View>
            <View style={styles.listCont}>
              <FlatList
                contentContainerStyle={styles.list}
                data={user.articles}
                renderItem={({item}) => this.renderArticle(item)}
                horizontal
                />
            </View>
          </View>

          <View style={styles.section}>
            <View style={style.sectionHead}>
              <Text style={styles.sectionTitle}>
                {I18n.t('latestAddedBooks')}
              </Text>
              <Text
                style={[styles.showMoreText, style.themedFontColor]}
                onPress={this.showAddedBooks}>
                {I18n.t('seeMore')}
              </Text>
            </View>
            <View style={styles.listCont}>
              <FlatList
                contentContainerStyle={styles.list}
                data={user.addedBooks}
                renderItem={({item}) => this.renderBook(item)}
                horizontal
                />
            </View>
          </View>
        </View>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});
export default connect(mapStateToProps, {})(UserProfile);

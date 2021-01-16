import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {styles} from './style';
import {connect} from 'react-redux';
import {Icon, Left, Radio, Right, Item, CardItem} from 'native-base';
import {customBaseUrl} from '../../configs/global';
import {mainColor, textColor, bgColor} from '../../configs/global';
import Carousel from 'react-native-snap-carousel';
const {width: Width, height: Height} = Dimensions.get('window');
import {logout, updateUserImg, getUserDetails} from '../../actions/auth';
import DocumentPicker from 'react-native-document-picker';
import {client} from '../../queries/queryClient';
import {getFavBooksQuery} from '../../queries/book';
import {getFavAuthorsQuery} from '../../queries/author';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';

class userProfile extends Component {
  constructor(props) {
    super(props);
    console.log('User Info2 : ', this.props.userData);
    this.state = {
      userImg:
        this.props.userData.photo ||
        'https://provisionhealthcare.com/wp-content/uploads/2018/11/user-avatar.jpg',
      favBooks: null,
      favAuthors: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('new props : ', props, state);
    if (props.userData.photo && props.userData.photo !== state.userImg) {
      return {
        userImg: props.userData.photo,
      };
    } else {
      return null;
    }
  }

  componentDidMount = async () => {
    let {userID, getUserDetails} = this.props;
    getUserDetails(userID);
    this.updateFavBooks();
    this.updateFavAuthors();
  };

  updateFavBooks = async () => {
    let {userID} = this.props;
    await client
      .query({
        query: getFavBooksQuery,
        variables: {
          userID,
        },
        fetchPolicy: 'no-cache',
      })
      .then((res) => {
        console.log('favBooksRes : ', res);
        this.setState({
          favBooks: res.data.favBooks,
        });
      })
      .catch((err) => {
        console.log('Getting Fav Books error : ', err, userID);
      });
  };

  updateFavAuthors = async () => {
    let {userID} = this.props;
    await client
      .query({
        query: getFavAuthorsQuery,
        variables: {
          userID,
        },
        fetchPolicy: 'no-cache',
      })
      .then((res) => {
        console.log('favAuthorsRes : ', res);
        this.setState({
          favAuthors: res.data.favAuthors,
        });
      })
      .catch((err) => {
        console.log('Getting Fav Authors error : ', err, userID);
      });
  };

  gotoAuthorScreen = (author) => {
    this.props.navigation.navigate('AuthorProfile', {
      author,
    });
  };
  renderAuthorCard = ({item}) => {
    console.log('render item : ', item);
    return (
      <View style={styles.bookItem}>
        <AuthorCard
          author={item.author}
          navigation={() => this.gotoAuthorScreen(item.author)}
        />
      </View>
    );
  };

  renderFavBook = ({item}) => {
    if (item.book)
      return (
        <View style={styles.bookItem}>
          <SmallBookCard
            book={item.book}
            key={item.book.id}
            navigate={() => this.gotoBookScreen(item.book.id)}
          />
        </View>
      );
  };
  gotoBookScreen = (bookID) => {
    this.props.navigation.navigate('BookDetails', {
      bookID,
    });
  };

  updateImg = async () => {
    let formData = new FormData();
    let {userData, updateUserImg} = this.props;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );

      formData.append('new-image', res);
      console.log('FD : ', formData);

      this.setState({
        userImg: res.uri,
      });
      await fetch(`${customBaseUrl}/upload`, {
        method: 'POST',
        // mode: 'cors',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log('Image res : ', res);
          updateUserImg(userData.id, res.url);
        })
        .catch((err) => console.log('upload err: ', err));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  render() {
    const {userData} = this.props;
    console.log('render user info: ', userData.fullname);
    console.log(this.props.loadList, this.props.moviesList);

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              this.updateFavBooks();
              this.updateFavAuthors();
            }}
            refreshing={!this.props.loadList}
          />
        }>
        <View style={styles.topView}>
          <View style={styles.headView}>
            <Left></Left>
            <Right>
              <TouchableOpacity
                onPress={() => this.props.logout(this.props.userData.id)}>
                <Icon name="log-out" style={styles.logoutIcon} type="Feather" />
              </TouchableOpacity>
            </Right>
          </View>
        </View>
        <View style={styles.userData}>
          <TouchableOpacity
            onPress={this.updateImg}
            style={styles.profileImgBtn}>
            <Image
              source={{
                uri: this.state.userImg,
              }}
              style={styles.profileImg}
            />
            <Icon
              name="edit"
              type="FontAwesome5"
              style={{
                color: mainColor,
                position: 'relative',
                top: '-15%',
                left: '70%',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.userName}>
            {' '}
            {userData.name || userData.fullname}{' '}
          </Text>
        </View>

        <View style={styles.sectionView}>
          <Text style={styles.headLine}>Your Favourite Books </Text>
          {this.state.favBooks !== null && this.state.favBooks.length > 0 ? (
            <Carousel
              // autoplay
              firstItem={this.state.favBooks.length > 1 ? 1 : 0}
              data={this.state.favBooks}
              renderItem={this.renderFavBook}
              sliderWidth={Width}
              itemWidth={200}
              separatorWidth={-10}
            />
          ) : this.props.loadList && this.props.moviesList.length == 0 ? (
            <Text style={styles.emptyMsg}>
              Sorry but You didn't add any Book in Your Favourite List
            </Text>
          ) : (
            <View style={styles.nowPlayingMovies}>
              <ActivityIndicator color={mainColor} size="large" />
            </View>
          )}
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.headLine}>Your Favourite Authors </Text>
          {this.state.favAuthors !== null &&
          this.state.favAuthors.length > 0 ? (
            <Carousel
              data={this.state.favAuthors}
              renderItem={this.renderAuthorCard}
              sliderWidth={Width}
              itemWidth={100}
              // layout={'default'}
              // autoplay
              firstItem={this.state.favAuthors.length > 1 ? 1 : 0}
            />
          ) : this.state.favAuthors !== null &&
            this.state.favAuthors.length == 0 ? (
            <Text style={styles.emptyMsg}>
              Sorry but You didn't add any Author in Your Favourite List
            </Text>
          ) : (
            <View style={styles.nowPlayingMovies}>
              <ActivityIndicator color={mainColor} size="large" />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  userID: state.auth.userID,
  moviesList: state.wlist ? state.wlist.movieWL : [],
  seriesList: state.wlist ? state.wlist.seriesWL : [],
  loadList: state.wlist ? state.wlist.loadList : [],
});

export default connect(mapStateToProps, {
  logout,
  updateUserImg,
  getUserDetails,
})(userProfile);

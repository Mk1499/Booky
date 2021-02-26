import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Permission,
} from 'react-native';
import {styles} from './style';
import {connect} from 'react-redux';
import {Icon, Left, Right} from 'native-base';
import {customBaseUrl} from '../../configs/global';
import {mainColor, width} from '../../configs/global';
import Carousel from 'react-native-snap-carousel';
import {logout, updateUserImg, getUserDetails} from '../../actions/auth';
import DocumentPicker from 'react-native-document-picker';
import {client} from '../../queries/queryClient';
import {getFavBooksQuery} from '../../queries/book';
import {getFavAuthorsQuery} from '../../queries/author';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

class userProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImg:
        'https://provisionhealthcare.com/wp-content/uploads/2018/11/user-avatar.jpg',
      favBooks: null,
      favAuthors: null,
      imgUpdated: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // console.log('new props : ', props, state);
    if (
      props.userData.photo &&
      props.userData.photo !== state.userImg &&
      !state.imgUpdated
    ) {
      console.log('Img Changed : ', props.userData.photo);
      return {
        userImg: props.userData.photo,
      };
    } else {
      return null;
    }
  }

  componentDidMount = async () => {
    let {userID} = this.props;
    this.props.getUserDetails(userID);
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
      await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
        .then(async (res) => {
          let reference = storage().ref();
          this.setState({
            userImg: res.uri,
            imgUpdated: true,
          });
          const data = await RNFS.readFile(res.uri, 'base64');
          let imgName = `${Math.random() * 10000}${res.name}.jpg`;
          await reference
            .child(`profilePics/ ${imgName}`)
            .putString(data, 'base64')
            .then(() => {
              // console.log('URL : ', url + '/' + imgName);
            })
            .catch((err) => {
              console.log("Can't upload : ", err);
            });
        })
        .catch((err) => {
          console.log('upload Err : ', err);
          throw err;
        });
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
    // console.log('render user info: ', userData.fullname);
    // console.log(this.props.loadList, this.props.moviesList);

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
            <Icon name="edit" type="FontAwesome5" style={styles.editIcon} />
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
              sliderWidth={width}
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
              sliderWidth={width}
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

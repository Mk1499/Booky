import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './style';
import {connect} from 'react-redux';
import {Icon, Left, Right} from 'native-base';
import {mainColor, width} from '../../configs/global';
// import Carousel from 'react-native-snap-carousel';
import {logout, updateUserImg, getUserDetails} from '../../actions/auth';
import DocumentPicker from 'react-native-document-picker';
import {client} from '../../queries/queryClient';
import {getFavBooksQuery} from '../../queries/book';
import {getFavAuthorsQuery} from '../../queries/author';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import AuthorCard from '../../Components/AuthorCard/AuthorCard';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import I18n from '../../translate';
import Carousel from 'react-native-snap-carousel';

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
    // let formData = new FormData();
    let {userData, updateUserImg} = this.props;
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
        .then(async (res) => {
          let imgName = `${Math.random() * 10000}${res.name}`;
          let reference = storage().ref(`profilePics/${imgName}`);
          this.setState({
            userImg: res.uri,
            imgUpdated: true,
          });
          const data = await RNFS.readFile(res.uri, 'base64');
          await reference
            // .child(`profilePics/${imgName}`)
            .putString(data, 'base64')
            .then(async () => {
              let imgURL = await reference.getDownloadURL();
              updateUserImg(userData.id, imgURL);
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
            {/* <Icon name="edit" type="FontAwesome5" style={styles.editIcon} /> */}
          </TouchableOpacity>
          <Text style={styles.userName}>
            {' '}
            {userData.name || userData.fullname}{' '}
          </Text>
          <View style={styles.userSubData}>
            <View style={styles.dataCont}>
              <Text style={[styles.dataHeader]}>{I18n.t('readsNum')}</Text>
              <Text style={styles.dataText}>
                {Math.round(userData.reads?.length / 2)}
              </Text>
            </View>
            <View style={styles.dataCont}>
              <Text style={styles.dataHeader}>{I18n.t('addedBooks')}</Text>
              <Text style={styles.dataText}>{userData.addedBooks?.length}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionView}>
          <Text style={styles.headLine}>{I18n.t('yourFavBooks')} </Text>
          {this.state.favBooks !== null && this.state.favBooks.length > 0 ? (
            <Carousel
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
          <Text style={styles.headLine}>{I18n.t('yourFavAuthors')} </Text>
          {this.state.favAuthors !== null &&
          this.state.favAuthors.length > 0 ? (
            <Carousel
              data={this.state.favAuthors}
              renderItem={this.renderAuthorCard}
              sliderWidth={width}
              itemWidth={100}
              firstItem={this.state.favAuthors.length > 1 ? 1 : 0}
            />
          ) : this.state.favAuthors !== null &&
            this.state.favAuthors.length === 0 ? (
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

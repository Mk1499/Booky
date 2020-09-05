import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
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

class userProfile extends Component {
  constructor(props) {
    super(props);
    console.log('User Info2 : ', this.props.userData);
    this.state = {
      darkMode: true,
      loadList: this.props.loadList,
      moviesList: [],
      seriesList: [],
      userImg:
        this.props.userData.photo ||
        'https://provisionhealthcare.com/wp-content/uploads/2018/11/user-avatar.jpg',
    };
  }

  componentDidMount = async () => {
    let {userID, getUserDetails} = this.props;
    getUserDetails(userID);
  };

  static getDerivedStateFromProps(props, state) {
    console.log('new props : ', props, state);
    if (props.userData.photo && props.userData.photo !== state.userImg) {
      return {
        userImg: props.userData.photo,
      };
    }
  }

  renderSmallMovie = (movie, index) => {
    console.log('Mov : ', movie);

    return (
      <TouchableOpacity
        onPress={() => this.gotoMovieScreen(movie.item)}
        key={movie.item.id}
        activeOpacity={1}>
        {/* <SmallMovie movie={movie.item} /> */}
      </TouchableOpacity>
    );
  };

  // Movie Pressed
  gotoMovieScreen = movie => {
    this.props.navigation.navigate('Movie', {movie});
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
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log('Image res : ', res);
          updateUserImg(userData.id, res.url);
        })
        .catch(err => console.log('upload err: ', err));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  renderSmallSeries = (series, index) => {
    // console.log("Mov : ", series);

    return (
      <TouchableOpacity
        onPress={() => this.gotoSeriesScreen(series.item)}
        key={series.item.id}
        activeOpacity={1}>
        {/* <SmallMovie movie={series.item} /> */}
      </TouchableOpacity>
    );
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
            onRefresh={this.props.getList}
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
          <Text style={styles.headLine}>Your Movies List </Text>
          {this.props.moviesList.length > 0 && this.props.loadList ? (
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.moviesList}
              renderItem={this.renderSmallMovie}
              sliderWidth={0.9 * Width}
              itemWidth={0.5 * Width}
              layout={'default'}
            />
          ) : this.props.loadList && this.props.moviesList.length == 0 ? (
            <Text style={styles.emptyMsg}>
              Sorry but You didn't add any Movies
            </Text>
          ) : (
            <View style={styles.nowPlayingMovies}>
              <ActivityIndicator color={mainColor} size="large" />
            </View>
          )}
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.headLine}>Your Series List </Text>
          {this.props.seriesList.length > 0 && this.props.loadList ? (
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.seriesList}
              renderItem={this.renderSmallSeries}
              sliderWidth={0.9 * Width}
              itemWidth={0.5 * Width}
              layout={'default'}
            />
          ) : this.props.loadList && this.props.seriesList.length == 0 ? (
            <Text style={styles.emptyMsg}>
              Sorry but You didn't add any Movies
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

const mapStateToProps = state => ({
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

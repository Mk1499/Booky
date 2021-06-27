import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Icon, Right} from 'native-base';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import SubHeader from '../../Components/SubHeader/SubHeader';

import {mainColor} from '../../configs/global';
import {styles, animation, animatedHeight} from './style';
import {getAuthorDetails} from '../../queries/queries';
import {
  addAuthorToFavMutation,
  removeAuthorToFavMutation,
} from '../../mutations/author';
import {useQuery} from '@apollo/client';
import {client} from '../../queries/queryClient';
import {updateFavAuthorsAction} from '../../actions/author';
import {updateUserImg} from '../../actions/auth';
import {connect} from 'react-redux';
import I18n, {getActiveLang} from '../../translate';
import {getTheme} from '../../Services/themes';

const {width, height} = Dimensions.get('screen');

function ActorPrfile(props) {
  let authorData = props.route.params.author;
  let authorID = authorData.id;
  let avatarURL = authorData.avatarURL;
  let name =
    authorData.enName && getActiveLang() === 'en'
      ? authorData.enName
      : authorData.name;

  // // console.log('Author Props : ', authorID);

  const [author, setAuthor] = useState({
    id: authorID,
    avatarURL,
    name,
  });
  const [moreIconName, setMoreIconName] = useState('up');
  const [scrollable, setScrollable] = useState(false);
  const [scrollableDown, setScrollableDown] = useState(false);
  const [scrollableUp, setScrollableUp] = useState(true);
  const [favState, setFavState] = useState(false);
  const [favID, setFavID] = React.useState('');

  function goBack() {
    props.navigation.goBack();
  }
  function gotoBookScreen(bookID) {
    props.navigation.navigate('BookDetails', {
      bookID,
    });
  }
  useQuery(getAuthorDetails, {
    variables: {id: authorID},
    onCompleted: (data) => {
      // // console.log('Author Data : ', data, authorID);
      setAuthor(data.author);
    },
    onError: (err) => {
      // console.log('Getting a Author details Error : ', err);
    },
    notifyOnNetworkStatusChange: true,
  });

  function auhtorDetails() {
    // move up
    if (scrollableUp) {
      setScrollableDown(true);
      setScrollableUp(false);
      setMoreIconName('down');
      setScrollable(true);

      Animated.spring(animation.y, {
        toValue: -0.4 * height,
        tension: 0.5,
        useNativeDriver: true,
      }).start();
    } else if (scrollableDown) {
      setMoreIconName('up');
      setScrollable(false);
      setScrollableDown(false);
      setScrollableUp(true);

      Animated.spring(animation.y, {
        toValue: 0 * height,
        tension: 0.5,
        useNativeDriver: true,
      }).start();
    }
  }

  function renderWork({item}, type) {
    // // console.log('Book :', item);

    return (
      <TouchableOpacity
        onPress={() => {
          //   this.gotoMovieScreen(item, type);
        }}
        activeOpacity={1}
        style={styles.bookItem}>
        <SmallBookCard book={item} navigate={() => gotoBookScreen(item.id)} />
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    checkAuthorFav();
  }, []);

  function checkAuthorFav() {
    let {favAuthorsIDs} = props;
    if (favAuthorsIDs.includes(authorID)) {
      setFavState(true);
    }
  }

  function addToFav() {
    // // console.log('Author Data : ', author);
    setFavState(true);
    let {favAuthorsIDs, updateFavAuthorsAction} = props;
    let newFavAuthorsIDs = [...favAuthorsIDs, authorID];
    updateFavAuthorsAction(newFavAuthorsIDs);
    client
      .mutate({
        mutation: addAuthorToFavMutation,
        variables: {
          userID: props.userID,
          authorID: author.id,
        },
      })
      .then((res) => {})
      .catch((err) => {});
  }

  function removeFromFav() {
    setFavState(false);
    let {favAuthorsIDs, updateFavAuthorsAction, userID} = props;
    let newFavAuthorsIDs = favAuthorsIDs.filter((id) => id !== authorID);
    updateFavAuthorsAction(newFavAuthorsIDs);
    console.log('VARS : ', authorID, userID);
    client
      .mutate({
        mutation: removeAuthorToFavMutation,
        variables: {
          userID,
          authorID,
        },
      })
      .then((res) => {})
      .catch((err) => {
        // console.log('remove author from fav err : ', err);
      });
  }

  let style = {
    mainView: {
      ...styles.mainView,
      backgroundColor: getTheme().background,
    },
    actorName: {
      ...styles.actorName,
      color: getTheme().text,
    },
  };

  let authorName =
    author.enName && getActiveLang() === 'en' ? author.enName : author.name;

  return (
    <View>
      <SubHeader
        goBack={goBack}
        state={favState}
        changeFav={favState ? removeFromFav : addToFav}
      />

      <Image
        style={{
          width,
          height: 0.5 * height,
          marginTop: -0.1 * height,
          zIndex: -1,
        }}
        source={{
          uri: author.avatarURL,
        }}
      />
      <Animated.View style={[style.mainView, animatedHeight]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 0.8 * width}}>
            <Text style={style.actorName}>{authorName}</Text>
            {/* <Text style={styles.note}>{this.state.known_for_department}</Text> */}
          </View>
          <Right>
            <TouchableOpacity style={styles.upDownBtn} onPress={auhtorDetails}>
              <Icon
                name={moreIconName}
                type="AntDesign"
                style={{color: mainColor}}
              />
            </TouchableOpacity>
          </Right>
        </View>
        <ScrollView
          scrollEnabled={scrollable}
          showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 0.05 * height}}>
            <Text style={styles.sectionTitle}>{I18n.t('bio')}</Text>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={{
                textAlign: 'center',
                color: getTheme().text,
                fontFamily: 'Cairo',
              }}>
              {author.bio || `${I18n.t('noBio')}${author.name}`}
            </Text>
          </View>

          {author.books ? (
            <View
              style={{
                marginTop: 0.05 * height,
              }}>
              <Text style={styles.sectionTitle}>{I18n.t('books')}</Text>
              <FlatList
                horizontal={true}
                data={author.books}
                renderItem={(item) => renderWork(item, 'Movie')}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : null}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  userID: state.auth.userData.id,
  favAuthorsIDs: state.author.favAuthorsIDs,
});

export default connect(mapStateToProps, {
  updateUserImg,
  updateFavAuthorsAction,
})(ActorPrfile);

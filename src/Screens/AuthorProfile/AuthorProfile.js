import React, {useState} from 'react';
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
import {Icon, Left, Right} from 'native-base';
import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import SubHeader from '../../Components/SubHeader/SubHeader';

import {
  baseUrl,
  apiKey,
  mainColor,
  bgColor,
  textColor,
  subColor,
} from '../../configs/global';
import {styles, animation, animatedHeight} from './style';
import {getAuthorDetails} from '../../queries/queries';
import {useQuery} from '@apollo/client';

const {width, height} = Dimensions.get('screen');

export default function ActorPrfile(props) {
  let authorID = props.navigation.state.params.author.id;
  let avatarURL = props.navigation.state.params.author.avatarURL;
  let name = props.navigation.state.params.author.name;

  console.log('Author Props : ', authorID);

  const [author, setAuthor] = useState({
    id: authorID,
    avatarURL,
    name,
  });
  const [moreIconName, setMoreIconName] = useState('up');
  const [scrollable, setScrollable] = useState(false);
  const [scrollableDown, setScrollableDown] = useState(false);
  const [scrollableUp, setScrollableUp] = useState(true);

  function goBack() {
    props.navigation.goBack();
  }
  function gotoBookScreen(bookID) {
    props.navigation.navigate('BookDetails', {
      bookID,
    });
  }

  const {refetch} = useQuery(getAuthorDetails, {
    variables: {id: authorID},
    onCompleted: data => {
      console.log('Author Data : ', data, authorID);
      setAuthor(data.author);
    },
    onError: err => {
      console.log('Getting a Author details Error : ', err);
    },
    notifyOnNetworkStatusChange: true,
  });

  function moveDetails() {
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
    console.log('Book :', item);

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

  return (
    <View>
      <SubHeader goBack={goBack} />

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
      <Animated.View style={[styles.mainView, animatedHeight]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:0.8*width}}>
            <Text style={styles.actorName}>{author.name}</Text>
            {/* <Text style={styles.note}>{this.state.known_for_department}</Text> */}
          </View>
          <Right>
            <TouchableOpacity style={styles.upDownBtn} onPress={moveDetails}>
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
            <Text style={styles.sectionTitle}>Biography</Text>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={{
                textAlign: 'center',
                color: subColor,
                fontFamily: 'Cairo',
              }}>
              {author.bio || `Sorry There is available Bio for ${author.name}`}
            </Text>
          </View>

          <View
            style={{
              marginTop: 0.05 * height,
              flexDirection: 'row',
            }}>
            <View style={styles.iconMainView}>
              <View style={styles.iconView}>
                <Icon name="trending-up" style={{color: mainColor}} />
              </View>
              {/* <Text style={styles.iconText}>
                {this.state.popularity || 'N/A'}
              </Text> */}
            </View>
            <View style={styles.iconMainView}>
              <View style={styles.iconView}>
                <Icon
                  name="flag"
                  style={{color: mainColor}}
                  type="FontAwesome"
                />
              </View>
              <Text style={styles.iconText}>{author.birthDate || 'N/A'}</Text>
            </View>
          </View>
          {author.books ? (
            <View
              style={{
                marginTop: 0.05 * height,
              }}>
              <Text style={styles.sectionTitle}>Books</Text>
              <FlatList
                horizontal={true}
                data={author.books}
                renderItem={item => renderWork(item, 'Movie')}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : null}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

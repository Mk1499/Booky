import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import {useQuery} from '@apollo/client';
import SubHeader from '../../Components/SubHeader/SubHeader';
import {getGenreDetails} from '../../queries/queries';

import I18n, {getActiveLang} from '../../translate';
import styles from './styles';

import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import {getTheme} from '../../Services/themes';
import {mainColor} from '../../configs/global';
import {client} from '../../queries/queryClient';

export default function GenreScreen(props) {
  const [genre, setGenre] = useState({});
  const [cover, setCover] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  function goBack() {
    props.navigation.goBack();
  }

  useEffect(() => {
    getDetails();
  }, []);

  function getDetails() {
    let genreID = props.route.params.genreID;

    client
      .query({
        query: getGenreDetails,
        variables: {
          id: genreID,
        },
      })
      .then(({data}) => {
        setRefreshing(false);
        setGenre(data.genre);
        setCover(data.genre.photoURL);
      })
      .catch((err) => {
        setRefreshing(false);
      });
  }

  let genreID = props.route.params.genreID;
  // const {refetch} = useQuery(getGenreDetails, {
  //   variables: {
  //     id: genreID,
  //   },
  //   onCompleted: (data) => {
  //     // // console.log('Genre Data : ', data);

  //     setRefreshing(false);
  //     setGenre(data.genre);
  //     setCover(data.genre.photoURL);
  //   },
  //   onError: (err) => {
  //     // console.log('Props : ', props);
  //     // // console.log('Getting a book details Error : ', err);
  //     setRefreshing(false);
  //   },
  // });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // refetch();
    getDetails();
  }, []);

  function gotoBookScreen(bookID) {
    props.navigation.push('BookDetails', {
      bookID,
    });
  }

  function renderBooks({item}) {
    return (
      <View style={styles.bookItem}>
        <SmallBookCard
          book={item}
          key={item.id}
          navigate={() => gotoBookScreen(item.id)}
        />
      </View>
    );
  }

  function failToLoadImg() {
    let blankPhotoURL =
      'https://discountflooringsupplies.com.au/wp-content/uploads/blank-img.jpg';

    setCover(blankPhotoURL);
  }

  let style = {
    container: {
      ...styles.container,
      backgroundColor: getTheme().background,
    },
    content: {
      ...styles.content,
      backgroundColor: getTheme().background,
    },
    sideHead: {
      ...styles.sideHead,
      color: getTheme().text,
    },
  };

  let name =
    genre.enName && getActiveLang() === 'en' ? genre.enName : genre.name;
  console.log('Genre : ', genre);

  return (
    <ScrollView
      contentContainerStyle={style.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[mainColor]}
        />
      }>
      <View style={styles.header}>
        <SubHeader goBack={goBack} />
      </View>
      <Image
        source={{uri: cover}}
        style={styles.genreImage}
        onError={() => failToLoadImg()}
      />
      <View style={style.content}>
        <View>
          <Text style={styles.genreName}>{name}</Text>
        </View>
        {genre.books ? (
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={style.sideHead}>{I18n.t('trendyBooks')}</Text>
              {/* <Text style={styles.seeMore}>See More > </Text> */}
            </View>
            <View style={styles.bookList}>
              <FlatList
                data={genre.books}
                renderItem={renderBooks}
                // horizontal
                showsHorizontalScrollIndicator={false}
                // contentContainerStyle={styles.bookList}
                numColumns={2}
              />
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

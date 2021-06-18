import React, {useState} from 'react';
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

import I18n from '../../translate';
import styles from './styles';

import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';
import {getTheme} from '../../Services/themes';

export default function GenreScreen(props) {
  const [genre, setGenre] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  function goBack() {
    props.navigation.goBack();
  }

  let genreID = props.route.params.genreID;
  const {refetch} = useQuery(getGenreDetails, {
    variables: {
      id: genreID,
    },
    onCompleted: (data) => {
      // console.log('Genre Data : ', data);

      setRefreshing(false);
      setGenre(data.genre);
    },
    onError: (err) => {
      console.log('Props : ', props);

      // console.log('Getting a book details Error : ', err);
    },
  });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    refetch();
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

  let style = {
    container: {
      ...styles.container,
      backgroundColor: getTheme().background,
    },
    content:{
      ...styles.content,
      backgroundColor: getTheme().background,
    }, 
    sideHead:{
      ...styles.sideHead,
      color: getTheme().text
    }
  };

  return (
    <ScrollView
      contentContainerStyle={style.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <SubHeader goBack={goBack} />
      </View>
      <Image source={{uri: genre.photoURL}} style={styles.genreImage} />
      <View style={style.content}>
        <View>
          <Text style={styles.genreName}>{genre.name}</Text>
        </View>
        {genre.books ? (
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={style.sideHead}>{I18n.t('trendyBooks')}</Text>
              {/* <Text style={styles.seeMore}>See More > </Text> */}
            </View>
            <FlatList
              data={genre.books}
              renderItem={renderBooks}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

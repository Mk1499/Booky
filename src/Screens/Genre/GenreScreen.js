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
import {
  width,
  height,
  bgColor,
  mainColor,
  subColor,
  textColor,
} from '../../configs/global';
import I18n from '../../translate';

import SmallBookCard from '../../Components/SmallBookCard/SmallBookCard';

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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <SubHeader goBack={goBack} />
      </View>
      <Image source={{uri: genre.photoURL}} style={styles.genreImage} />
      <View style={styles.content}>
        <View>
          <Text style={styles.genreName}>{genre.name}</Text>
        </View>
        {genre.books ? (
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sideHead}>{I18n.t('trendyBooks')}</Text>
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

const styles = StyleSheet.create({
  container: {},
  genreImage: {
    width,
    height: 0.25 * height,
    marginTop: -0.1 * height,
  },
  headContent: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  content: {
    backgroundColor: textColor,
    elevation: 14,
    marginTop: -0.02 * height,
    paddingVertical: 0.02 * height,
    paddingHorizontal: 0.04 * width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  genreName: {
    fontFamily: 'Cairo-SemiBold',
    color: mainColor,
    // alignSelf: 'center',
    fontSize: 0.06 * width,
  },
  header: {
    height: 0.1 * height,
    zIndex: 2,
    // backgroundColor: 'red',
  },
  section: {
    marginVertical: 0.03 * height,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 0.92 * width,
    marginBottom: 0.02 * height,
  },
  sideHead: {
    color: subColor,
    fontSize: 0.05 * width,
    fontFamily: 'Cairo-SemiBold',
  },
  seeMore: {
    textDecorationLine: 'underline',
    fontFamily: 'Cairo',
  },
  bookItem: {
    marginHorizontal: 0.02 * width,
  },
});

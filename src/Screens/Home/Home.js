import React, {useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header/Header';
import {mainColor} from '../../configs/global';
import BookCard from '../../Components/BookCard/BookCard';
import Carousel from 'react-native-anchor-carousel';
const {width, height} = Dimensions.get('window');

let data = [
  {
    cover:
      'https://i.pinimg.com/originals/a3/2c/c5/a32cc5fb7003e627bf36d3b5b538fe2e.png',
    name: 'Origin',
  },
  {
    cover:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1534070871l/85266._SY475_.jpg',
    name: 'Davinci Code',
  },
  {
    cover:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1448579273l/27993335._SY475_.jpg',
    name: 'المنجم',
  },
];

function renderItem({item}) {
  return <BookCard book={item} />;
}

function Home(props) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.roundedBG} />
      <View style={styles.content}>
        <Carousel
          style={styles.carousel}
          data={data}
          renderItem={renderItem}
          itemWidth={200}
          containerWidth={width}
          separatorWidth={-10}
          // ref={carouselRef}
          initialIndex={1}
          //pagingEnable={false}
          //minScrollDistance={20}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 0.9 * height,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -10,
    height: 0.35 * height,
    width,
    backgroundColor: mainColor,
    borderBottomEndRadius: 0.45 * width,
    borderBottomLeftRadius: 0.45 * width,
  },
  carousel: {
    marginVertical: 0.1 * height,
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Home);

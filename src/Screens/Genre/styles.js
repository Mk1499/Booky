import {StyleSheet} from 'react-native';
import {
  width,
  height,
  bgColor,
  mainColor,
  subColor,
  textColor,
} from '../../configs/global';

export default StyleSheet.create({
  container: {
    height,
  },
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
    paddingBottom: 0.083 * height,
    paddingHorizontal: 0.04 * width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height,
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

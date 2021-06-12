import {StyleSheet} from 'react-native';
import {
  width,
  height,
  mainColor,
  textColor,
  subColor,
} from '../../configs/global';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 0.1 * height,
  },
  headCont: {
    // backgroundColor: 'rgba(254,44,84,0.8)',
    opacity: 0.8,
  },
  firstHalf: {
    height: 0.5 * height,
    backgroundColor: 'rgba(254,44,84,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCover: {
    width: 0.4 * width,
    height: 0.3 * height,
    borderRadius: 20,
  },
  coverView: {
    elevation: 20,
    borderRadius: 20,
    // marginTop: -0.1 * height,
    backgroundColor: mainColor,
  },
  bookName: {
    color: textColor,
    fontFamily: 'Cairo-Bold',
    marginVertical: 0.01 * height,
    fontSize: 0.06 * width,
  },
  authorName: {
    fontFamily: 'Cairo-Bold',
    color: subColor,
    fontSize: 0.035 * width,
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    width,
    height: 0.6 * height,
    opacity: 0.8,
  },
  commentsView: {
    paddingHorizontal: 0.05 * width,
    marginVertical: 0.05 * height,
  },
});

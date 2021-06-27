import {StyleSheet} from 'react-native';
import {
  mainColor,
  width,
  height,
  textColor,
  subColor,
} from '../../configs/global';

export const styles = StyleSheet.create({
  container: {},
  headCont: {
    backgroundColor: 'rgba(254,44,84,0.8)',
  },
  firstHalf: {
    height: 0.6 * height,
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
    marginTop: -0.1 * height,
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
  bookActionCont: {
    marginTop: -0.045 * height,
    alignItems: 'center',
  },
  bookData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 0.9 * width,
    paddingHorizontal: 0.05 * width,
    marginTop: 0.03 * height,
  },
  head: {
    fontFamily: 'Cairo',
    color: textColor,
    alignSelf: 'center',
    fontSize: 0.03 * width,
  },
  data: {
    fontFamily: 'Cairo-Bold',
    color: textColor,
    alignSelf: 'center',
    fontSize: 0.04 * width,
    maxWidth: 0.18 * width,
    height: 0.1 * height,
  },
  secHalf: {},
  section: {
    marginVertical: 0.03 * height,
    paddingHorizontal: 0.05 * width,
  },
  desc: {
    fontFamily: 'Cairo',
    textAlign: 'center',
  },
  bookItem: {
    marginHorizontal: 0.02 * width,
  },
  sideHeader: {
    color: mainColor,
    fontSize: 0.06 * width,
    fontFamily: 'Cairo-SemiBold',
    marginBottom: 0.03 * height,
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    width,
    height: 0.7 * height,
    opacity: 0.8,
  },
});

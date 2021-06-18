import {StyleSheet, I18nManager} from 'react-native';
import {height, width, mainColor} from '../../configs/global';

export default StyleSheet.create({
  container: {
    height: 0.9 * height,
  },
  topContent: {
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
    marginTop: 0.1 * height,
    marginBottom: 0.03 * height,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  section: {
    paddingHorizontal: 0.03 * width,
    marginVertical: 0.03 * height,
  },
  sideHeader: {
    color: mainColor,
    fontSize: 0.06 * width,
    fontFamily: 'Cairo-SemiBold',
    marginBottom: 0.03 * height,
  },
  bookItem: {
    marginHorizontal: 0.02 * width,
  },
  genreCont: {
    marginVertical: 0.03 * height,
  },
  loadContainer: {
    width,
    height: 0.8 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadImg: {
    width: 0.2 * width,
    height: 0.2 * height,
  },
  addBtn: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0.05 * height,
    right: 0.07 * width,
  },
  hList: {
    paddingHorizontal: -0.03 * width,
  },
});

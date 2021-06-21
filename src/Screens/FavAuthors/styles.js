import {StyleSheet} from 'react-native';
import {height, mainColor, width} from '../../configs/global';

export default StyleSheet.create({
  container: {
    height,
  },
  content: {
    paddingHorizontal: 0.02 * width,
    paddingVertical: 0.05 * height,
    // paddingBottom: 0.2 * height,
  },
  centerView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    color: mainColor,
    fontFamily: 'Cairo',
  },
});

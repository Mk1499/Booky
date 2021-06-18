import {StyleSheet} from 'react-native';
import {width, height, mainColor, subColor} from '../../configs/global';

export default StyleSheet.create({
  container: {
    width,
    height: 0.5 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 0.4 * width,
    color: mainColor,
  },
  text: {
    fontFamily: 'Cairo',
    color: mainColor,
    marginTop: 0.02 * height,
  },
  searchName: {
    color: subColor,
  },
});

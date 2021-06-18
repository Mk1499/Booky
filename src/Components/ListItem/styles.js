import {StyleSheet} from 'react-native';
import {mainColor, width, height} from '../../configs/global';
import {getActiveLang} from '../../translate';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 0.015 * height,
    borderBottomWidth: 1,
  },
  icon: {
    color: mainColor,
    marginEnd: 0.02 * width,
  },
  text: {
    fontFamily: 'Cairo',
    marginEnd: 0.02 * width,
  },
});

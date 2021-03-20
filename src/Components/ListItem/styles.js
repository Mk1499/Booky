import {StyleSheet} from 'react-native';
import {mainColor, width, height} from '../../configs/global';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0.015 * height,
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  icon: {
    color: mainColor,
    marginEnd: 0.02 * width,
  },
  text: {
    fontFamily: 'Cairo',
  },
});

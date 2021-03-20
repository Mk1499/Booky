import {StyleSheet} from 'react-native';
import {width, height, mainColor} from '../../configs/global';

export default StyleSheet.create({
  container: {
    width,
    height: 0.08 * height,
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0.05 * width,
  },
  icon: {
    color: mainColor,
  },
});

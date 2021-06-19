import {StyleSheet} from 'react-native';
import {mainColor, height, width} from '../../configs/global';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: mainColor,
    marginBottom: 0.04 * height,
  },
  icon: {
    color: mainColor,
    marginHorizontal: 0.02 * width,
  },
  input: {
    width: '90%',
    fontFamily: 'Cairo',
  },
});

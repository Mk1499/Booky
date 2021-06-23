import {StyleSheet} from 'react-native';
import {height, width} from '../../configs/global';

export default StyleSheet.create({
  container: {
    height,
  },
  centerView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 0.02 * width,
    paddingVertical: 0.05 * height,
  },
  list: {
    alignSelf: 'center',
  },
  book: {
    marginHorizontal: 0.05 * width,
    marginVertical: 0.05 * width,
  },
});

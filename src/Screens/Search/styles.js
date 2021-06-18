import {StyleSheet} from 'react-native';
import {height, width} from '../../configs/global';

export default StyleSheet.create({
  container: {
    minHeight: height,
  },
  searchContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0.05 * height,
    paddingBottom: 0.4 * height,
    // backgroundColor:'red'
  },
  loadImg: {
    width: 0.2 * width,
    height: 0.2 * height,
  },
  loadContainer: {
    width,
    height: 0.5 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

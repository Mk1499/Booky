import {StyleSheet, Platform} from 'react-native';
import {width, height, mainColor} from '../../configs/global';

export default StyleSheet.create({
  container: {
    width,
    height:  Platform.OS === 'ios' ?  0.1 * height : 0.08 * height,
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0.05 * width,
    paddingTop: Platform.OS === 'ios' ? 0.03 * height : 0 
  },
  icon: {
    color: mainColor,
  },
});

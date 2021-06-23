import {StyleSheet} from 'react-native';
import {height, width,mainColor} from '../../configs/global';

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
    marginHorizontal: 0.02 * width,
    marginVertical: 0.05 * width,
    elevation:3,
    shadowColor:"#333",
    paddingBottom:0.02 * height, 
    borderRadius:0.01*height
  },
  msg: {
    color: mainColor,
    fontFamily: 'Cairo',
  },
});

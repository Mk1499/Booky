import {StyleSheet} from 'react-native';
import {height, mainColor, textColor, width} from '../../configs/global';

export default StyleSheet.create({
  container: {},
  content: {
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 0.05 * width,
    borderRadius: 10,
    minHeight: 0.35 * height,
    // width: 0.8 * width,
  },
  img: {
    width: 0.25 * width,
    height: 0.12 * height,
    marginVertical: 0.01 * height,
    // marginTop: -0.03 * height,
  },
  headerCont: {},
  header: {
    fontFamily: 'Cairo-Bold',
    fontSize: 24,
  },
  msg: {
    fontFamily: 'Cairo',
    fontSize: 14,
    textAlign: 'center',
  },
  actionBtn: {
    padding: 0.02 * width,
    backgroundColor: mainColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 0.02 * width,
    marginVertical: 0.05 * height,
    width: '50%',
  },
  actionText: {
    textAlign: 'center',
    fontFamily: 'Cairo-Bold',
    color: textColor,

  },
});

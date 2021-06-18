import {StyleSheet} from 'react-native';
import {mainColor, width, height} from '../../configs/global';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    // borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 10,
    width: 0.8 * width,
    height: 0.1 * height,
    alignSelf: 'center',
    marginTop: 0.05 * height,
    elevation: 3,
    shadowColor: mainColor,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: '75%',
    fontSize: 12,
    color: mainColor,
    fontFamily: 'Cairo',
  },
  btn: {
    justifyContent: 'center',
  },
  icon: {
    color: mainColor,
  },
});

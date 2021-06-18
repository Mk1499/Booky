import {StyleSheet} from 'react-native';
import {height, width, mainColor} from '../../configs/global';
import {getActiveLang} from '../../translate';

export default StyleSheet.create({
  container: {
    minHeight: 0.2 * height,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 0.05 * width,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: 0.1 * width,
    resizeMode: 'cover',
  },
  textContent: {
    marginHorizontal: 0.02 * width,
  },
  name: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 0.055 * width,
    // fontWeight: 'bold',
    // color: '#333',
  },
  email: {
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    fontSize: 0.025 * width,
    fontFamily: 'Cairo',
    color: 'grey',
    marginHorizontal: 0.01 * width,
  },
  quoteCont: {
    flexDirection: 'row',
    marginVertical: 0.02 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    fontFamily: 'Cairo',
    color: mainColor,
    textAlign: 'center',
    marginHorizontal: 0.01 * width,
  },
  icon: {
    fontSize: 0.03 * width,
    color: mainColor,
  },
});

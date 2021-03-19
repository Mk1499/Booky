import {StyleSheet} from 'react-native';
import {width, height, mainColor, textColor} from '../../configs/global';

export const styles = StyleSheet.create({
  container: {
    width: 0.8 * width,
    height: 0.1 * height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectBtn: {
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
  },
  selectBtnText: {
    color: textColor,
    fontFamily: 'Cairo',
  },
  imgPath: {
    width: '80%',
    color: mainColor,
    fontFamily: 'Cairo',
  },
  img: {
    width: '20%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
});

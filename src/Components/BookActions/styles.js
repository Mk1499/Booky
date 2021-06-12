import {StyleSheet} from 'react-native';
import {width, height} from '../../configs/global';
import i18n, {getActiveLang} from '../../translate';

export const styles = StyleSheet.create({
  container: {
    width: 0.8 * width,
    height: 0.09 * height,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    elevation: 1,
  },
  Btn: {
    width: 0.4 * width,
    // width: '100%',
    flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    borderColor: '#fff',
    backgroundColor: '#201f2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBtn: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 1,
  },
  leftBtn: {
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    fontFamily: 'Cairo',
    color: '#eee',
    fontSize: 0.035 * width,
  },
  icon: {
    color: '#eee',
    marginHorizontal: 0.02 * width,
  },
});

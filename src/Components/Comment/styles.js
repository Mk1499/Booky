import {StyleSheet} from 'react-native';
import {width, height, mainColor} from '../../configs/global';
import {getActiveLang} from '../../translate';

export const styles = StyleSheet.create({
  container: {
    // width,
    minHeight: 0.15 * height,
    // marginVertical: 0.008 * height,
    flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderColor: '#ddd',
  },
  userImg: {
    marginHorizontal: '1%',
  },
  textCont: {
    marginHorizontal: '4%',
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
  },
  userName: {
    color: mainColor,
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    fontFamily: 'Cairo-Bold',
  },
  comment: {
    fontFamily: 'Cairo',
    width: 0.65 * width,
  },
});

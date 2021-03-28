import {StyleSheet} from 'react-native';
import {height, bgColor, mainColor, width} from '../../configs/global';
import I18n, {getActiveLang} from '../../translate';

export const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: bgColor,
  },
  content: {
    textAlign: 'right',
    direction: 'rtl',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    // borderColor: mainColor,
    // borderWidth: 1,
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    width: 0.8 * width,
    marginVertical: 0.025 * height,
    paddingHorizontal: 0.05 * width,
    fontFamily: 'Cairo',
    // elevation: 2,
    // shadowColor: mainColor,
    borderColor: mainColor,
    borderBottomWidth: 1,
    color: mainColor,
  },
  logoImg: {
    width: 0.8 * width,
    height: 0.1 * height,
    alignSelf: 'center',
    marginTop: 0.05 * height,
  },
  signUpLinkView: {
    marginVertical: 0.04 * height,
    flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
  },
  text: {
    fontFamily: 'Cairo',
  },
  textLink: {
    fontFamily: 'Cairo',
    color: mainColor,
  },
});

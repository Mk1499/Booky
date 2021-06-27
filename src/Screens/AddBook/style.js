import {StyleSheet} from 'react-native';
import {width, height, mainColor, bgColor} from '../../configs/global';
import {getTheme} from '../../Services/themes';

export const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: getTheme().background,
  },
  content: {
    minHeight: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
    paddingBottom: 0.2 * height,
  },
  input: {
    borderRadius: 0,
    width: 0.8 * width,
    marginVertical: 0.025 * height,
    paddingHorizontal: 0.05 * width,
    fontFamily: 'Cairo',
    color: mainColor,
    backgroundColor: bgColor,
    borderBottomWidth: 1,
    borderColor: mainColor,
  },
  logoImg: {
    width: 0.8 * width,
    height: 0.1 * height,
    alignSelf: 'center',
    marginTop: 0.05 * height,
  },
  signUpLinkView: {
    marginVertical: 0.04 * height,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Cairo',
  },
  textLink: {
    fontFamily: 'Cairo',
    color: mainColor,
  },
});

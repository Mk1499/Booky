import {StyleSheet} from 'react-native'; 
import {width, height, mainColor} from '../../configs/global';


export const styles = StyleSheet.create({
    container: {
      height,
    },
    content: {
      height: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderRadius: 10,
      // borderColor: mainColor,
      // borderWidth: 1,
      width: 0.8 * width,
      marginVertical: 0.025 * height,
      paddingHorizontal: 0.05 * width,
      fontFamily: 'Cairo',
      elevation: 2,
      shadowColor: mainColor,
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
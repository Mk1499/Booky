import {StyleSheet, Dimensions} from 'react-native';
import {mainColor, textColor} from '../../configs/global';

const {width, height} = Dimensions.get('window');

export const Styles = StyleSheet.create({
  main: {
    backgroundColor: mainColor,
    width: 0.08 * height,
    height: 0.08 * height,
    borderRadius: 0.05 * height,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  icon : {
    color:textColor,
    // fontSize:0.1 * width
  }
});

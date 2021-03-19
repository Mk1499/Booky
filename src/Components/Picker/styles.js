import {StyleSheet} from 'react-native';
import {width, height, bgColor, mainColor} from '../../configs/global';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 0.02 * height,
    fontFamily: 'Cairo',
  },
  pickerCont: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // elevation: 5,
    backgroundColor: bgColor,
    borderRadius: 0.02 * width,
  },
  picker: {
    width: 0.8 * width,
    height: 0.08 * height,
    color: mainColor,
  },
  pickerItem: {
    color: mainColor,
  },
  label: {
    fontSize: 0.04 * width,
    fontFamily: 'Cairo',
    color: mainColor,
    marginBottom: 0.01 * height,
  },
});

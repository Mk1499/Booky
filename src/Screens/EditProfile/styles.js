import {StyleSheet} from 'react-native';
import {height, width, mainColor} from '../../configs/global';

export default StyleSheet.create({
  container: {
    height: 100,
  },
  form: {
    marginTop: 0.05 * height,
    paddingHorizontal: 0.1 * width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imgCont: {
    marginBottom: 0.05 * height,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: mainColor,
    fontFamily: 'Cairo',
    marginBottom: 0.05 * height,
  },
  icon: {
    position: 'absolute',
    // left:100,
    color: mainColor,
    borderColor: mainColor,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 55,
  },
  btnCont: {
    position: 'relative',
    bottom: 0,
  },
});

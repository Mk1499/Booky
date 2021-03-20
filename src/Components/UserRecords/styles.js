import {StyleSheet} from 'react-native';
import {height, mainColor, width} from '../../configs/global';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    // borderColor: '#eee',
    marginVertical: 0.02 * height,
    // paddingVertical: 0.01 * height,
  },
  item: {
    width: '50%',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 0.5,
    paddingVertical: 0.01 * height,
  },
  itemData: {
    fontFamily: 'Cairo',
    fontWeight: 'bold',
    fontSize: 0.045 * width,
  },
  itemName: {
    color: mainColor,
    fontFamily: 'Cairo',
    fontSize: 0.03 * width,
  },
});

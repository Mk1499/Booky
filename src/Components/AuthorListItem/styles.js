import {StyleSheet} from 'react-native';
import {height, width, mainColor, textColor} from '../../configs/global';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 0.02 * height,
  },
  dataCont: {
    paddingHorizontal: '7%',
    backgroundColor: mainColor,
    marginHorizontal: '-5%',
    height: '50%',
    width: '65%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: '40%',
    height: 0.3 * height,
    borderRadius: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: mainColor,
  },
  head: {
    fontSize: 15,
    // fontWeight: 'bold',
    color: '#1f2933',
    fontFamily: 'Cairo-Bold',
  },
  data: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'Cairo',
  },
});

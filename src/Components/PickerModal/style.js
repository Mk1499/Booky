import {StyleSheet} from 'react-native';
import {width, height, mainColor, textColor} from '../../configs/global';
import {getActiveLang} from '../../translate';
export default StyleSheet.create({
  container: {},
  modalContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
  },
  modalContent: {
    height: 0.7 * height,
    // backgroundColor: '#fff',
    borderRadius: 0.04 * width,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Cairo-Bold',
    color: textColor,
  },
  dataCont: {
    paddingHorizontal: 0.04 * width,
  },
  list: {
    marginBottom: 0.1 * height,
  },
  listItem: {
    flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    height: 0.1 * height,
    alignItems: 'center',
    borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  itemImg: {
    width: 0.1 * width,
    height: 0.1 * width,
    borderRadius: 0.05 * width,
    marginHorizontal: 0.05 * width,
  },
  itemName: {
    color: mainColor,
    fontFamily: 'Cairo',
  },
  mianBtn: {
    backgroundColor: mainColor,
    padding: 0.02 * width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 0.02 * width,
    marginVertical: 0.02 * height,
    width: '50%',
    alignItems:'center'
  },
  mainBtnLabel: {
    fontFamily: 'Cairo',
    color: textColor,
  },
  chooseCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 0.8 * width,
    position: 'relative',
    marginVertical: 0.02 * height,
  },
  choosenName: {
    fontFamily: 'Cairo',
    color: mainColor,
  },
  chooseBtn: {
    padding: 0.02 * width,
    backgroundColor: mainColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 0.02 * width,
  },
  chooseText: {
    fontFamily: 'Cairo',
    color: textColor,
  },
});

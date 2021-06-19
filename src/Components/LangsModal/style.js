import {StyleSheet} from 'react-native';
import {
  mainColor,
  width,
  height,
  subColor,
  textColor,
} from '../../configs/global';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 0.85 * width,
    minHeight: 0.45 * height,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0.01 * height,
    height: '15%',
    backgroundColor: mainColor,
  },
  header: {
    fontFamily: 'Cairo',
    color: textColor,
  },
  langList: {
    marginVertical: 0.05 * height,
    alignItems: 'center',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 0.75 * width,
    // backgroundColor: "#fff",
    alignItems: 'center',
    paddingHorizontal: 0.02 * width,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    height: 0.1 * height,
  },

  langCover: {
    width: 0.1 * width,
    height: 0.1 * width,
    borderRadius: 0.05 * width,
    marginHorizontal: 0.02 * width,
  },
  langName: {
    color: mainColor,
    fontFamily: 'Cairo',
  },
  activeLangName: {
    color: subColor,
    fontFamily: 'Cairo',
  },
  langAddIcon: {
    color: mainColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

import {StyleSheet, Dimensions} from 'react-native';
import {mainColor, textColor, bgColor, subColor} from '../../configs/global';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: bgColor,
    fontFamily: 'Cairo',
  },
  topView: {
    height: 0.4 * height,
    backgroundColor: mainColor,
    borderBottomRightRadius: 0.25 * width,
    borderBottomLeftRadius: 0.25 * width,
  },
  userData: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgColor,
    width: 0.9 * width,
    borderRadius: 20,
    paddingTop: 0.1 * height,
    paddingBottom: 0.05 * height,
    marginTop: -0.15 * height,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 0.1 * height,
    backgroundColor: '#eee',
  },

  editIcon: {
    color: mainColor,
    position: 'relative',
    top: '-15%',
    left: '70%',
  },
  profileImgBtn: {
    width: 0.2 * height,
    height: 0.2 * height,
    borderRadius: 0.1 * height,
    marginBottom: 0.02 * height,
    marginTop: -0.2 * height,
    borderWidth: 10,
    borderColor: '#eee',
    zIndex: 50,
  },
  userName: {
    color: mainColor,
    // fontWeight:'bold',
    fontSize: 0.06 * width,
    fontFamily: 'Cairo',
  },
  logoutIcon: {
    color: bgColor,
    // alignSelf:'flex-end',

    fontSize: 0.1 * width,
  },
  themeSwitch: {
    // alignSelf:'flex-start',
    marginLeft: 0.03 * width,
    alignItems: 'center',
    paddingTop: 0.01 * height,
  },
  headView: {
    marginRight: 0.05 * width,
    marginTop: 0.05 * height,
    flexDirection: 'row',
  },
  headLine: {
    fontSize: 0.055 * width,
    color: mainColor,
    fontFamily: 'Cairo',
    marginBottom: 0.06 * height,
  },
  sectionView: {
    marginTop: 0.1 * height,
    marginBottom: 0.1 * height,
    marginLeft: 0.04 * width,
  },
  emptyMsg: {
    textAlign: 'center',
    color: subColor,
    fontFamily: 'Cairo',
    fontSize: 0.035 * width,
  },
  carousel: {
    // marginTop: 0.1 * height,
    // marginBottom: 0.03 * height,
  },

  userSubData: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 0.05 * height,
  },
  dataCont: {
    alignItems: 'center',
    fontFamily: 'Cairo',
  },
  dataHeader: {
    // fontWeight: 'bold',
    fontFamily: 'Cairo',
    color: mainColor,
    fontSize: 0.04 * width,
  },
  dataText: {
    fontSize: 0.04 * width,
    fontFamily: 'Cairo',
    color: mainColor,
  },
});

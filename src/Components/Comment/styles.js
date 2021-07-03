import {StyleSheet} from 'react-native';
import {width, height, mainColor} from '../../configs/global';
import {getActiveLang} from '../../translate';

export const styles = StyleSheet.create({
  container: {
    // width,
    // marginVertical: 0.008 * height,
    // flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    // alignItems: 'center',
    borderBottomWidth: 0.7,
    borderColor: '#ddd',
    paddingVertical: 0.01 * height,
    // backgroundColor:'blue'
    // justifyContent: 'space-around',
  },
  commentCont: {
    minHeight: 0.1 * height,
    flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    // display:'flex',
    // flex: 5,
    // backgroundColor: '#ddd',
  },
  userImg: {
    marginHorizontal: '1%',
  },

  textCont: {
    marginHorizontal: '4%',
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
  },
  userName: {
    color: mainColor,
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    fontFamily: 'Cairo-Bold',
  },
  comment: {
    fontFamily: 'Cairo',
    width: 0.7 * width,
    // paddingHorizontal: 0.2 * width,
  },
  likes: {
    // backgroundColor: 'red',
    alignContent: 'center',
    justifyContent: 'center',
  },
  likesCont: {
    flexDirection: 'row-reverse',
    flex: 1,
  },
  likeDataCont: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: '1%',
  },
  likeIcon: {
    color: mainColor,
  },
  likesText: {
    fontFamily: 'Cairo',
    color: mainColor,
  },
});

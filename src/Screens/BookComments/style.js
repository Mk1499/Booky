import {StyleSheet} from 'react-native';
import {width, mainColor} from '../../configs/global'; 

export default StyleSheet.create({
  container: {},
  content: {
    height:"79.3%"
  },
  bookData: {},
  noCommnets: {},
  addCommentCont: {
    // backgroundColor:"#fff"
  },
  spinner:{
    color:mainColor
  }, 
  loadingCont:{
    width,
    height:"100%", 
    justifyContent:'center',
    alignItems:'center',
  },
  msgCont:{
    width,
    height:"100%",
    alignItems:'center',
    justifyContent:'center'
  },
  msg:{
    fontFamily:'Cairo',
    color:mainColor, 
    fontSize:0.04 * width
  }
});

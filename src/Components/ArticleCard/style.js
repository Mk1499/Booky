import { StyleSheet } from "react-native";
import {width,height,mainColor} from '../../configs/global';

export default StyleSheet.create({
    container:{
        width : 0.8*width,
        height:0.5 * height,
        borderWidth:1,
        borderColor:mainColor,
        borderRadius:10,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'#fff',
        marginHorizontal:0.02 * width,
        overflow:'hidden',
        marginVertical:0.03 * height
    },
    coverCont:{
        width:'100%',
        height:"45%"
    }, 
    cover:{
        width:'100%',
        height:"100%"
    },
    titleCont:{
        alignItems:'center',
        marginVertical:"4%"
    },
    title:{
        fontFamily:'Cairo',
        fontSize:18,
        color:mainColor
    },
    upperRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:'3%',
        marginTop:"3%"
    },
    userCont:{
        flexDirection:'row',
        alignItems:'center'
    },
    userImg:{
        width:0.1*width,
        height:0.1*width,
        borderRadius:0.05*width,
        resizeMode:'cover', 
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 1,
    },
    userImgCont:{
    },
    userName:{
        fontFamily:'Cairo',
        marginHorizontal:0.02 * width
    },
    likesCont:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'blue',
        paddingTop:5
    },
    likeView:{
        alignItems:'center',
        marginHorizontal:0.02 * width,
        justifyContent:'center',
        flexDirection:'column'
    },
    likeIcon:{
        color:mainColor , 
        fontSize:0.05 * width
    },
    likesNum:{
        fontFamily:'Cairo',
        // marginVertical:2
    },
    priefCont:{
        paddingHorizontal:'3%',
        alignItems:'center',
       paddingBottom:0.1 * height
    },
    prief:{
        fontFamily:'Cairo',
        opacity:0.7, 
        fontSize:0.03 * width
    }, 
    line:{
        width : '95%',
        height:1,
        backgroundColor:mainColor,
        opacity:0.3,
        alignSelf:'center',
        marginVertical:5
    }
    

})
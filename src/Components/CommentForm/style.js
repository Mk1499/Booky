import { StyleSheet } from "react-native";
import {height,width,mainColor, textColor} from '../../configs/global';

export default StyleSheet.create({
    container:{
        // backgroundColor:'#333',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:0.1 * height,
        paddingHorizontal:0.03 * width
    },
    content:{},
    input:{
        width: "75%",
        borderWidth:1,
        borderColor:mainColor, 
        borderRadius:10, 
        paddingHorizontal:0.02 * width,
        fontFamily:'Cairo',
        color:mainColor
    },
    button:{
        backgroundColor:mainColor,
        height: "60%",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
        elevation: 3,
        width:0.2 * width
    },
    btnText:{
        fontFamily:'Cairo',
        color:textColor
    }
})
import { StyleSheet, Platform } from "react-native";
import { mainColor, width, height } from "../../configs/global";

export default StyleSheet.create({
    container: {

    },
    content: {},
    header: {
        height: Platform.OS === 'ios' ? 0.1 * height : 0.08 * height,
        paddingTop: Platform.OS === 'ios' ? 0.04 * height : 0,
        paddingHorizontal: 0.02 * width,
        backfaceVisibility: 'visible'
    },
    backIcon: {
        color: mainColor
    },
    cover: {
        width,
        height: 0.3 * height,
        marginTop: -0.1 * height,
        zIndex: -1,
    },
    headDataCont: {
        alignItems: 'center',
    },
    profileImgCont: {
        // backgroundColor:'red',
        marginTop: -0.07 * height,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor:'#fff',
        borderRadius: 20,
        overflow:'hidden'
    },
    profileImg: {
        width: 0.4 * width,
        height: 0.2 * height,
    },
    name: {
        fontFamily: 'Cairo',
        // color:mainColor,
        fontSize: 0.06 * width,
        marginVertical: 0.01 * height
    }, 
    priefRow:{
        paddingHorizontal:0.04 * width, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical: 0.01 * height
    },
    preifCont:{},
    preifHead:{
        fontFamily:'Cairo',
        fontSize:0.04 * width
    },
    priefData:{
        textAlign:'center', 
        fontSize:0.04 * width, 
        fontFamily:'Cairo',
        color:mainColor
    }, 
    followBtnCont:{
        marginVertical: 0.03 * height,
        width,
        alignItems:'center'
    },
    followBtn:{
        width:'80%',
        borderWidth:2,
        borderColor:mainColor,
        height:0.06 * height,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    followText:{
        fontFamily:'Cairo',
        color:mainColor, 
        fontSize:25 
    }, 
    section:{
        marginVertical:0.03 * height
    }, 
    sectionHead:{
        paddingHorizontal:0.04 * width, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    sectionTitle:{
        fontFamily:'Cairo',
        color:mainColor, 
        fontSize:25  
    },
    showMoreText:{
        fontFamily:'Cairo',
        fontSize:15  
    },
    listCont:{
    },
    list:{
        paddingHorizontal:0.03 * width
    }, 
    bookItem:{
        marginTop: 0.03 * height,
        marginHorizontal: 0.02 * width
    }
})
import { StyleSheet } from "react-native";
import {height, width, mainColor} from '../../configs/global';
import { getTheme } from "../../Services/themes";


export default StyleSheet.create({
    container: {
        width: 0.8 * width,
        height: 0.35 * height,
        marginVertical: 0.02 * height,
        elevation: 3,
        shadowColor:mainColor,
        borderRadius: 13,
        overflow: 'hidden',
      },
      header: {
        height: '20%',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: mainColor,
        // borderBottomWidth: 0.5,
      },
      bookName: {
        color: mainColor,
        fontFamily: 'Cairo',
      },
      body: {
        height: '55%',
      },
      bookImg: {
        width: '90%',
        height: '90%',
        borderRadius: 13,
        alignSelf: 'center',
      },
      footer: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderColor: mainColor,
        borderTopWidth: 0.4,
        paddingTop: 10,
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      midItem: {
        // borderColor: 'grey',
        // borderLeftWidth: 0.4,
        // borderRightWidth: 0.4,
        paddingHorizontal: 7,
        // width: '30%',
      },
      icon: {
        marginRight: 5,
        color: mainColor,
        fontSize: 22,
      },
      itemText: {
        color: 'grey',
        fontSize: 12,
        fontFamily: 'Cairo',
      },
})
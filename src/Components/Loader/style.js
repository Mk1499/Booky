import { StyleSheet } from "react-native";
import {width,height,mainColor} from '../../configs/global';

export default StyleSheet.create({
    loadContainer: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
      },
      loadImg: {
        width: 0.2 * width,
        height: 0.2 * height,
      },
})
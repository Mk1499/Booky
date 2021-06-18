import {Dimensions} from 'react-native';
import {getTheme} from '../Services/themes';
import {useTheme} from '@react-navigation/native';

export const bgColor = getTheme().background;
// export const mainColor = '#fe2c54';
export const mainColor = getTheme().primary;

// export const mainColor = '#daaa63';
export const customBaseUrl = 'https://scorpionuploader.herokuapp.com';
export const textColor = '#eee';
export const subColor = '#201f2c';
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
// export const baseURL = 'http://192.168.1.77:4000/gql';
export const baseURL = 'https://bookyser.herokuapp.com/gql';

export function Theme() {
  const {colors} = useTheme();
  return useTheme().colors;
}

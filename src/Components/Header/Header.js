import React from 'react';
import {View, Text, StyleSheet, Image, I18nManager,Platform} from 'react-native';
import {mainColor, height, textColor, width} from '../../configs/global';
import logoWhite from '../../../assets/images/logoWhite.png';



export default function Header() {
  return (
    <View style={styles.container}>
      {/* <Icon
        style={styles.appIcon}
        name="book-open-page-variant"
        type="MaterialCommunityIcons"
      /> */}
      <Image source={logoWhite} style={styles.logoImg} resizeMode="contain" />
      <Text style={styles.appName}>oOkY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    height:Platform.OS === 'ios'? 0.1 * height : 0.08 * height,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    elevation: 20,
    paddingTop: Platform.OS === 'ios'? 0.034* height:0
  },
  appName: {
    letterSpacing: 5,
    fontFamily: 'Roboto',
    color: textColor,
    fontSize: 0.03 * height,
  },
  appIcon: {
    marginHorizontal: 10,
    color: textColor,
  },
  logoImg: {
    width: 0.1 * width,
    height: '70%',
  },
});

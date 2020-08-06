import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {mainColor, height, textColor} from '../../configs/global';
import {Icon} from 'native-base';

export default function Header() {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.appIcon}
        name="book-open-page-variant"
        type="MaterialCommunityIcons"
      />
      <Text style={styles.appName}>BoOkY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    height: 0.08 * height,
    flexDirection: 'row',
    elevation: 20,
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
});

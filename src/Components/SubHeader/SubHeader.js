import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {height, width, textColor} from '../../configs/global';

export default function SubHeader(props) {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="chevron-thin-left"
        type="Entypo"
        onPress={props.goBack}
      />
      <Icon
        style={styles.icon}
        name="hearto"
        type="AntDesign"
        onPress={props.goBack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 0.1 * height,
    width,
    // position: 'absolute',
    top: 0,
    paddingHorizontal: 0.03 * width,
    flexDirection: 'row',
    // backgroundColor:"red"
  },
  icon: {
    color: textColor,
  },
});

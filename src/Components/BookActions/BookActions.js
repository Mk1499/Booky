import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {width, height} from '../../configs/global';
import {Icon} from 'native-base';

export default function BookActions() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.Btn, styles.leftBtn]}>
        <Icon name="ios-reader-outline" type="Ionicons" style={styles.icon} />

        <Text style={styles.text}>Read Book Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.Btn, styles.rightBtn]}>
        <Icon name="md-library-outline" type="Ionicons" style={styles.icon} />
        <Text style={styles.text}>Add To Library</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0.8 * width,
    height: 0.09 * height,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    elevation: 10,
  },
  Btn: {
    width: 0.4 * width,
    flexDirection: 'row',
    borderColor: '#fff',
    backgroundColor: '#201f2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBtn: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 1,
  },
  leftBtn: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    fontFamily: 'Cairo',
    color: '#eee',
    fontSize: 0.035 * width,
  },
  icon: {
    color: '#eee',
    marginHorizontal: 0.01 * width,
  },
});

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

export default class UserRecords extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.itemData}>200</Text>
          <Text style={styles.itemName}>Reads</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemData}>200</Text>
          <Text style={styles.itemName}>Reads</Text>
        </View>
      </View>
    );
  }
}

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import I18n from '../../translate';

export default class UserRecords extends Component {
  render() {
    let {reads, followers} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.itemData}>{reads || 0}</Text>
          <Text style={styles.itemName}>{I18n.t('reads')}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemData}>{followers || 0}</Text>
          <Text style={styles.itemName}>{I18n.t('followers')}</Text>
        </View>
      </View>
    );
  }
}

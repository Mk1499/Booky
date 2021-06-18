import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import I18n from '../../translate';
import {getTheme} from '../../Services/themes';

export default class UserRecords extends Component {
  render() {
    let {reads, followers} = this.props;

    let style = {
      ...styles,
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
      itemData: {
        ...styles.itemData,
        color: getTheme().text,
      },
      item: {
        ...styles.item,
        borderColor: getTheme().border,
      },
    };

    return (
      <View style={[style.container]}>
        <View style={style.item}>
          <Text style={style.itemData}>{reads || 0}</Text>
          <Text style={style.itemName}>{I18n.t('reads')}</Text>
        </View>

        <View style={style.item}>
          <Text style={style.itemData}>{followers || 0}</Text>
          <Text style={style.itemName}>{I18n.t('followers')}</Text>
        </View>
      </View>
    );
  }
}

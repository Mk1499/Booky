import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './style';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';
import { themeStyle } from '../../Services/themes';

export default class ActionHeader extends Component {
  render() {
    let {action} = this.props;
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row' : 'row-reverse',
    };
    return (
      <View style={[styles.container, dirStyle, themeStyle()]}>
        <Icon
          name={'account-edit-outline'}
          style={styles.icon}
          type="MaterialCommunityIcons"
          onPress={() => action()}
        />
      </View>
    );
  }
}

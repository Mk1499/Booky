import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './style';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';

export default class ActionHeader extends Component {
  render() {
    let {action} = this.props;
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row' : 'row-reverse',
    };
    return (
      <View style={[styles.container, dirStyle]}>
        <Icon
          name={'user-edit'}
          style={styles.icon}
          type="FontAwesome5"
          onPress={() => action()}
        />
      </View>
    );
  }
}

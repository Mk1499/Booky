import React, {Component} from 'react';
import {View, I18nManager} from 'react-native';
import styles from './style';
import {Icon} from 'native-base';

export default class ActionHeader extends Component {
  render() {
    let {action} = this.props;
    return (
      <View style={styles.container}>
        {/* <Icon
          name={I18nManager.isRTL ? 'left' : 'right'}
          style={styles.icon}
          type="AntDesign"
        /> */}
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

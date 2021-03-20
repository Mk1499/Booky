import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';

export default class ListItem extends Component {
  render() {
    let {text, iconName, iconType, action, redText} = this.props.item;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          action();
        }}>
        <Icon name={iconName} type={iconType} style={styles.icon} />
        <Text
          style={[
            styles.text,
            {
              color: redText ? 'red' : '#333',
            },
          ]}>
          {' '}
          {text}{' '}
        </Text>
      </TouchableOpacity>
    );
  }
}

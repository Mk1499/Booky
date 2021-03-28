import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';

export default class ListItem extends Component {
  componentDidMount() {
    console.log('Active Lang : ', getActiveLang());
  }

  render() {
    let {text, iconName, iconType, action, redText} = this.props.item;
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    };
    let redColorStyle = {
      color: redText ? 'red' : '#333',
    };
    return (
      <TouchableOpacity
        style={[styles.container, dirStyle]}
        onPress={() => {
          action();
        }}>
        <Icon name={iconName} type={iconType} style={styles.icon} />
        <Text style={[styles.text, redColorStyle]}> {text} </Text>
      </TouchableOpacity>
    );
  }
}

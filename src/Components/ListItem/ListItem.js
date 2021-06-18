import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';
import {getTheme} from '../../Services/themes';
import { mainColor } from '../../configs/global';

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
      color: redText ? mainColor : getTheme().text,
    };

    let style = {
      ...styles,
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
        borderColor: getTheme().border
      },
      text: {
        ...styles.text,
        color: getTheme().text,
      },
    };

    return (
      <TouchableOpacity
        style={[style.container, dirStyle]}
        onPress={() => {
          action();
        }}>
        <Icon name={iconName} type={iconType} style={styles.icon} />
        <Text style={[style.text, redColorStyle]}> {text} </Text>
      </TouchableOpacity>
    );
  }
}

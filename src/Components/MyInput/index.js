import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import {getTheme} from '../../Services/themes';
import {getActiveLang} from '../../translate';

export default class MyInput extends Component {
  render() {
    let {placeholder, value, onChangeText, iconName, iconType} = this.props;
    let style = {
      input: {
        ...styles.input,
        color: getTheme().primary,
      },
      container: {
        ...styles.container,
        flexDirection: getActiveLang() !== 'ar' ? 'row' : 'row-reverse',
      },
    };
    return (
      <View style={style.container}>
        {iconName && (
          <Icon style={styles.icon} name={iconName} type={iconType} />
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={style.input}
          placeholderTextColor={'grey'}
        />
      </View>
    );
  }
}

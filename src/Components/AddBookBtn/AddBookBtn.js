import {Icon} from 'native-base';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Styles} from './styles';

export default class AddBookBtn extends Component {
  render() {
    return (
      <View style={Styles.main}>
        <Icon name="add" style={Styles.icon} />
      </View>
    );
  }
}

import {Icon} from 'native-base';
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Styles} from './styles';

export default class AddBookBtn extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.action()}>
        <View style={Styles.main}>
          <Icon name="add" style={Styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

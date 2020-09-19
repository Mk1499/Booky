import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {width, height, mainColor,subColor} from '../../configs/global';

export default class SearchEmpty extends Component {
  render() {
    let {type, name} = this.props;
    return (
      <View style={styles.container}>
        <Icon
          name={type === 0 ? 'search1' : 'sad-cry'}
          type={type === 0 ? 'AntDesign' : 'FontAwesome5'}
          style={styles.icon}
        />
        <Text style={styles.text}>
          {type === 0
            ? 'You have No Search History'
            : 'Sorry But There is no Books with name '}
          <Text style={styles.searchName}>{name}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 0.5 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 0.4 * width,
    color: mainColor,
  },
  text: {
    fontFamily: 'Cairo',
    color: mainColor,
    marginTop:0.02*height
  },
  searchName:{
      color: subColor
  }
});

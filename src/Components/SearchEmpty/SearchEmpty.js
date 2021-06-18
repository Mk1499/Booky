import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import I18n from '../../translate';
import styles from './styles';
import {getTheme} from '../../Services/themes';

export default class SearchEmpty extends Component {
  render() {
    let {type, name} = this.props;

    let style = {
      ...styles,
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
      searchName:{
        ...styles.searchName,
        color: getTheme().text
      }
    };

    return (
      <View style={style.container}>
        <Icon
          name={type === 0 ? 'search1' : 'sad-cry'}
          type={type === 0 ? 'AntDesign' : 'FontAwesome5'}
          style={styles.icon}
        />
        <Text style={styles.text}>
          {type === 0 ? I18n.t('noSearchHistory') : I18n.t('noResultsFor')}
          <Text style={style.searchName}>{name}</Text>
        </Text>
      </View>
    );
  }
}

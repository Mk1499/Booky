import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';
import ListItem from '../ListItem/ListItem';
import {getTheme} from '../../Services/themes';

export default class SettingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {items} = this.props;
    let style = {
      ...styles,
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    return (
      <View style={style.container}>
        <FlatList
          data={items}
          renderItem={({item}) => <ListItem item={item} key={item.id} />}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
}

import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';
import ListItem from '../ListItem/ListItem';

export default class SettingList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {items} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({item}) => <ListItem item={item} />}
          contentContainerStyle={styles.list}
          keyExtractor={({item, index}) => index}
        />
      </View>
    );
  }
}

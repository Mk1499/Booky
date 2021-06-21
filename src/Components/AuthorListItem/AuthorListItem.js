import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import I18n, {getActiveLang} from '../../translate';

export default class AuthorListItem extends Component {
  render() {
    let {author, action} = this.props;
    let style = {
      container: {
        ...styles.container,
        flexDirection: getActiveLang() !== 'ar' ? 'row' : 'row-reverse',
      },
      dataRow: {
        ...styles.dataRow,
        flexDirection: getActiveLang() !== 'ar' ? 'row' : 'row-reverse',
      },
    };
    return (
      <TouchableOpacity style={style.container} onPress={() => action()}>
        {author.avatarURL ? (
          <Image
            source={{
              uri: author.avatarURL,
            }}
            style={styles.img}
          />
        ) : (
          <Image
            source={require('../../../assets/images/avatar.jpg')}
            style={styles.img}
          />
        )}
        <View style={styles.dataCont}>
          <View style={style.dataRow}>
            <Text style={styles.head}>{I18n.t('name')} : </Text>
            <Text style={styles.data}> {author.name}</Text>
          </View>
          <View style={style.dataRow}>
            <Text style={styles.head}>{I18n.t('age')} : </Text>
            <Text style={styles.data}>{author.age}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

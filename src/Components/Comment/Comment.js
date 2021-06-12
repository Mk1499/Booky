import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Thumbnail} from 'native-base';
import {getActiveLang} from '../../translate';

export default class Comment extends Component {
  render() {
    let {user, comment} = this.props;
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    };
    let textAlignStyle = {
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    };

    return (
      <View style={[styles.container, dirStyle]}>
        <Thumbnail
          style={styles.userImg}
          source={{
            uri: user?.avatarURL,
          }}
        />
        <View style={styles.textCont}>
          <Text style={[styles.userName, textAlignStyle]}>{user?.name}</Text>
          <Text
            style={[styles.comment, textAlignStyle]}
            numberOfLines={3}
            ellipsizeMode="tail">
            {comment}
          </Text>
        </View>
      </View>
    );
  }
}

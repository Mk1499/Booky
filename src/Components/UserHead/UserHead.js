import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';
import {getTheme} from '../../Services/themes';
import dummyProfilePic from '../../../assets/images/avatar.jpg';

export default class UserHead extends Component {
  render() {
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    };

    let {user, navigate} = this.props;
    let style = {
      ...styles,
      name: {
        ...styles.name,
        color: getTheme().text,
      },
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    return (
      <View style={[style.container]}>
        <TouchableOpacity
          activeOpacity={0}
          style={[styles.content, dirStyle]}
          onPress={navigate}>
          <Image
            style={styles.image}
            source={
              user.photo
                ? {
                    uri: user.photo,
                  }
                : dummyProfilePic
            }
            defaultSource={dummyProfilePic}
          />
          <View style={styles.textContent}>
            <Text style={style.name}> {user.name} </Text>
            <Text style={styles.email}> {user.email} </Text>
          </View>
        </TouchableOpacity>
        {user.quote   ? (
          <View style={styles.quoteCont}>
            <Icon name="quote-left" type="FontAwesome" style={styles.icon} />
            <Text style={styles.quote}>{user.quote}</Text>
            <Icon name="quote-right" type="FontAwesome" style={styles.icon} />
          </View>
        ) : null}
      </View>
    );
  }
}

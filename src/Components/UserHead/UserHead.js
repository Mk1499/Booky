import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';
import {getTheme} from '../../Services/themes';

export default class UserHead extends Component {
  render() {
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    };

    let {user} = this.props;
    let style = {
      ...styles,
      name: {
        ...styles.name,
        color: getTheme().text,
      },
      container:{
        ...styles.container, 
        backgroundColor:getTheme().background
      }
    };

    return (
      <View style={[style.container]}>
        <View style={[styles.content, dirStyle]}>
          <Image
            style={styles.image}
            source={{
              uri:
                user.photo ||
                'https://i.pinimg.com/originals/50/3d/de/503ddedd8c29b75b318d1af71744f446.jpg',
            }}
          />
          <View style={styles.textContent}>
            <Text style={style.name}> {user.name} </Text>
            <Text style={styles.email}> {user.email} </Text>
          </View>
        </View>
        <View style={styles.quoteCont}>
          <Icon name="quote-left" type="FontAwesome" style={styles.icon} />
          <Text style={styles.quote}>
            {user.quote}
          </Text>
          <Icon name="quote-right" type="FontAwesome" style={styles.icon} />
        </View>
      </View>
    );
  }
}

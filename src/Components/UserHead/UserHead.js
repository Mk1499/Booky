import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';

export default class UserHead extends Component {
  render() {
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    };

    let {user} = this.props;

    return (
      <View style={styles.container}>
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
            <Text style={styles.name}> {user.name} </Text>
            <Text style={styles.email}> {user.email} </Text>
          </View>
        </View>
        <View style={styles.quoteCont}>
          <Icon name="quote-left" type="FontAwesome" style={styles.icon} />
          <Text style={styles.quote}>
            {user.quote || ' يوما ما سيكون افضل'}
          </Text>
          <Icon name="quote-right" type="FontAwesome" style={styles.icon} />
        </View>
      </View>
    );
  }
}

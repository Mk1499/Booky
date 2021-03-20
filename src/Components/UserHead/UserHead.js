import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';

export default class UserHead extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/50/3d/de/503ddedd8c29b75b318d1af71744f446.jpg',
            }}
          />
          <View style={styles.textContent}>
            <Text style={styles.name}> Mohamed Khaled </Text>
            <Text style={styles.email}> Mohamed@mail.com </Text>
          </View>
        </View>
        <View style={styles.quoteCont}>
          <Icon name="quote-left" type="FontAwesome" style={styles.icon} />
          <Text style={styles.quote}>
            يوما ما سيكون افضل يوما ما سيكون افضل
          </Text>
          <Icon name="quote-right" type="FontAwesome" style={styles.icon} />
        </View>
      </View>
    );
  }
}

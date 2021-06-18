import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import {getTheme} from '../../Services/themes';

export default class CardImageExample extends Component {
  render() {
    let style = {
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.bookName}>{this.props.data.name}</Text>
        </View>
        <View style={styles.body}>
          <Image
            style={styles.bookImg}
            source={{
              uri: this.props.data.posterURL,
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.item}>
            <Icon style={[styles.icon]} name="star" type="Entypo" />
            <Text style={styles.itemText}>{this.props.data.rate} / 5</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AuthorProfile', {
                author: this.props.data.author,
              });
            }}>
            <View style={[styles.item, styles.midItem]}>
              <Icon
                style={[styles.icon]}
                name="user-circle-o"
                type="FontAwesome"
              />
              <Text
                style={[styles.itemText, {}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {this.props.data.author && this.props.data.author.name}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.item}>
            <Icon
              style={[styles.icon]}
              name="book-reader"
              type="FontAwesome5"
            />
            <Text style={styles.itemText}>38</Text>
          </View>
        </View>
      </View>
    );
  }
}

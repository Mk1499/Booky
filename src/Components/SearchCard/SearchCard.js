import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {height, width, mainColor} from '../../configs/global';
import {Icon} from 'native-base';

export default class CardImageExample extends Component {
  render() {
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

const styles = StyleSheet.create({
  container: {
    width: 0.8 * width,
    height: 0.35 * height,
    backgroundColor: '#fff',
    marginVertical: 0.02 * height,
    elevation: 3,
    borderRadius: 13,
    overflow: 'hidden',
  },
  header: {
    height: '20%',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: mainColor,
    // borderBottomWidth: 0.5,
  },
  bookName: {
    color: mainColor,
    fontFamily: 'Cairo',
  },
  body: {
    height: '55%',
  },
  bookImg: {
    width: '90%',
    height: '90%',
    borderRadius: 13,
    alignSelf: 'center',
  },
  footer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderColor: 'grey',
    borderTopWidth: 0.4,
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  midItem: {
    borderColor: 'grey',
    borderLeftWidth: 0.4,
    borderRightWidth: 0.4,
    paddingHorizontal: 7,
    // width: '30%',
  },
  icon: {
    marginRight: 5,
    color: mainColor,
    fontSize: 22,
  },
  itemText: {
    color: 'grey',
    fontSize: 12,
    fontFamily: 'Cairo',
  },
});

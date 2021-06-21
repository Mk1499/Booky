import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import {Icon} from 'native-base';
import {height, width, textColor, mainColor} from '../../configs/global';
import I18n from '../../translate';

export default function SubHeader(props) {
  const [favState, setFavState] = useState(props.state);

  function toggleFav() {
    props.changeFav();
    setFavState(!favState);
  }
  useEffect(() => {
    // // console.log('FavState changed : ', props.state);
    setFavState(props.state);
    // console.log('Lang : ', I18nManager);
  }, [props.state]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.noHeart ? mainColor : 'transparent',
        },
      ]}>
      <Icon
        style={[styles.icon]}
        name={I18nManager.isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
        type="Entypo"
        onPress={props.goBack}
      />
      {props.title && <Text style={styles.title}>{props.title}</Text>}
      {!props.noHeart && (
        <Icon
          style={[styles.icon]}
          name={favState ? 'heart' : 'hearto'}
          type="AntDesign"
          onPress={toggleFav}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 0.1 * height,
    width,
    // position: 'absolute',
    top: 0,
    paddingHorizontal: 0.03 * width,
    flexDirection: 'row',
    // backgroundColor:"red"
  },
  icon: {
    color: textColor,
  },
  title: {
    fontFamily: 'Cairo',
    color: textColor,
    fontSize: 0.06 * width,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    width: '90%',
    // backgroundColor:'black'
  },
});

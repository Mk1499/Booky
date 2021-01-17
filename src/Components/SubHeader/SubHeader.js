import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {height, width, textColor} from '../../configs/global';

export default function SubHeader(props) {
  const [favState, setFavState] = useState(props.state);

  function toggleFav() {
    props.changeFav();
    setFavState(!favState);
  }
  useEffect(() => {
    // console.log('FavState changed : ', props.state);
    setFavState(props.state);
  }, [props.state]);

  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="chevron-thin-left"
        type="Entypo"
        onPress={props.goBack}
      />
      <Icon
        style={styles.icon}
        name={favState ? 'heart' : 'hearto'}
        type="AntDesign"
        onPress={toggleFav}
      />
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
});

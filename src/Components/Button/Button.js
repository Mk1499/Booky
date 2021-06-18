import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {mainColor, height, width , Theme} from '../../configs/global';
import {Icon} from 'native-base';
import {getActiveLang} from '../../translate';

export default function Button(props) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: mainColor,
      // backgroundColor: Theme().mainColor,

      width: 0.8 * width,
      height: 0.1 * height,
      borderRadius: 10,
      justifyContent: 'center',
      elevation: 3,
    },
    content: {
      width: '100%',
      height: '100%',
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      //   backgroundColor: 'black',
      paddingHorizontal: 0.05 * width,
    },
    text: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'Cairo-Bold',
    },
  });

  //   const [processing, setProcessing] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // setProcessing(!processing);
        props.action();
      }}>
      {props.processing ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={[styles.content]}>
          <Text style={styles.text}>{props.text}</Text>
          <Icon
            name={getActiveLang() === 'ar' ? 'left' : 'right'}
            type="AntDesign"
            style={{color: '#fff'}}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

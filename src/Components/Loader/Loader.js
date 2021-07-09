import React, { Component } from 'react'
import { Text, View , Image } from 'react-native'
import { getTheme } from '../../Services/themes';
import styles from './style';

export default class Loader extends Component {
    render() {

        let style = {
            loadContainer : {
                ...styles.loadContainer, 
                backgroundColor: getTheme().background
            }
        }

        return (
            <View style={style.loadContainer}>
                <Image
                    source={require('../../../assets/images/logoAnimated.gif')}
                    style={styles.loadImg}
                    resizeMode={'contain'}
                />
            </View>
        )
    }
}

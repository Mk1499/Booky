import { Icon } from 'native-base';
import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { getTheme } from '../../Services/themes';
import { getActiveLang } from '../../translate';
import styles from './style';


export default class ArticleCard extends Component {

    render() {

        let { article } = this.props;

        let style = {
            userCont:{
                ...styles.userCont, 
                flexDirection: getActiveLang() === 'ar'? 'row-reverse' : 'row'
            }, 
            upperRow:{
                ...styles.upperRow,
                flexDirection: getActiveLang() === 'ar'? 'row-reverse' : 'row'
            }, 
            themedFontColor:{
                color:getTheme().text
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.coverCont}>
                    <Image style={styles.cover} source={{
                        uri: 'https://img.youm7.com/ArticleImgs/2020/9/24/172845-93fdd37799f823e9a4dc227c6304ae99.jpg'
                    }} />
                </View>
              
                <View style={style.upperRow}>
                    <View style={style.userCont}>
                        <Image
                            style={styles.userImg}
                            source={{ uri: "https://i.redd.it/dac08nj65vp21.jpg" }} />
                        <Text style={[styles.userName,style.themedFontColor]}>
                            Bob Morley
                        </Text>
                    </View>
                    <View style={styles.likesCont}>
                        <View style={styles.likeView}>
                            <Icon style={styles.likeIcon} name="like2" type="AntDesign" />
                            <Text style={[styles.likesNum,style.themedFontColor]}>22</Text>
                        </View>

                        <View style={styles.likeView}>
                            <Icon style={styles.likeIcon} name="dislike2" type="AntDesign" />
                            <Text style={[styles.likesNum,style.themedFontColor]}>13</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.titleCont}>
                    <Text style={styles.title}> How To The Choosen One </Text>
                </View>
                <View style={styles.line}></View>

                <View style={styles.priefCont}>
                    <Text style={[styles.prief,style.themedFontColor]} numberOfLines={3} ellipsizeMode="middle">
                        Sit enim enim duis elit excepteur ea.Ex Lorem occaecat exercitation reprehenderit laboris minim eiusmod.
                    </Text>
                </View>
            </View>
        )
    }
}

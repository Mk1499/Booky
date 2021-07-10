import { Icon } from 'native-base';
import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { getTheme } from '../../Services/themes';
import { getActiveLang } from '../../translate';
import styles from './style';
import profileAvatar from '../../../assets/images/avatar.jpg'; 
import dummyCover from '../../../assets/images/cover.jpg'; 


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
                    <Image 
                        style={styles.cover} 
                        source={
                        article.coverURL ?  {uri:  article.coverURL} : dummyCover}
                        defaultSource={dummyCover}
                        />
                </View>
              
                <View style={style.upperRow}>
                    <View style={style.userCont}>
                        <Image
                            style={styles.userImg}
                            source={article?.publisher?.photo ? { uri:  article?.publisher?.photo} :profileAvatar}
                            defaultSource={profileAvatar}
                            />
                        <Text style={[styles.userName,style.themedFontColor]}>
                            {article?.publisher?.name }
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
                    <Text style={styles.title}> {article.title} </Text>
                </View>
                <View style={styles.line}></View>

                <View style={styles.priefCont}>
                    <Text style={[styles.prief,style.themedFontColor]} numberOfLines={3} ellipsizeMode="middle">
                    {article.body}
                    </Text>
                </View>
            </View>
        )
    }
}

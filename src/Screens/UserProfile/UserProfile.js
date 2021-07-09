import React, { Component } from 'react'
import { Text, View, Image, ScrollView,TouchableOpacity  , FlatList} from 'react-native'
import styles from './styles'
import { Icon } from 'native-base';
import I18n ,{ getActiveLang } from '../../translate';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';
import BookCard from '../../Components/BookCard/BookCard';
import { getTheme } from '../../Services/themes';

export default class UserProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            articles:[1,2], 
            books:[
                {name:'Test'},
                {name:'Test'},
                {name:'Test'},
            ]
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    goToBookScreen = (book) => {

    }

    renderArticle = (item) => {
        return (
            <ArticleCard />
        )
    }

    renderBook = (item) => {
        return (
            <View style={styles.bookItem}>
             <BookCard book={item} navigation={() => this.goToBookScreen(book)} />
            </View>
        )
    }

    render() {
        let uri = "https://fbcoverstreet.com/content/8FiQ8TZfpuQD46OpLT5Xe4d83RQfD3oZm42DhLzooIfn24oJhYG3onFEkkXpD4cv.jpg"
        let  {articles , books} = this.state; 
     
        let style = {
            container:{
                ...styles.container,
                backgroundColor:getTheme().background
            },
            priefRow:{
                ...styles.priefRow,
                flexDirection: getActiveLang() === 'ar'? 'row-reverse' : 'row'
            }, 
            sectionHead:{
                ...styles.sectionHead,
                flexDirection: getActiveLang() === 'ar'? 'row-reverse' : 'row'
            }, 
            themedFontColor:{
                color:getTheme().text
            }
        }
     
        return (
            <ScrollView contentContainerStyle={style.container}>
                <View style={styles.header}>
                    <Icon
                        name={getActiveLang === 'ar' ? 'chevron-thin-right' : 'chevron-thin-left'}
                        type="Entypo"
                        style={styles.backIcon}
                        onPress={this.goBack} />
                </View>
                <Image style={styles.cover} source={{
                    uri
                }} />
                <View style={styles.headDataCont}>
                    <View style={styles.profileImgCont}>
                        <Image style={styles.profileImg} source={{
                            uri: "https://i.redd.it/dac08nj65vp21.jpg"
                        }} />
                    </View>
                    <Text style={[styles.name,style.themedFontColor]}>Bob Morley</Text>
                </View>
                <View style={style.priefRow}>
                    <View style={styles.preifCont}>
                        <Text style={[styles.preifHead , style.themedFontColor]}>{I18n.t('articles')}</Text>
                        <Text style={styles.priefData}>89</Text>
                    </View>
                    <View style={styles.preifCont}>
                        <Text style={[styles.preifHead , style.themedFontColor]}>{I18n.t('books')}</Text>
                        <Text style={styles.priefData}>0</Text>
                    </View>
                    <View style={styles.preifCont}>
                        <Text style={[styles.preifHead , style.themedFontColor]}>{I18n.t('followers')}</Text>
                        <Text style={styles.priefData}>100</Text>
                    </View>
                    <View style={styles.preifCont}>
                        <Text style={[styles.preifHead , style.themedFontColor]}>{I18n.t('following')}</Text>
                        <Text style={styles.priefData}>30</Text>
                    </View>
                </View>
                <View style={styles.followBtnCont}>
                    <TouchableOpacity style={styles.followBtn}>
                        <Text style={styles.followText}>
                        {I18n.t('follow')}
                        </Text>    
                     </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <View style={style.sectionHead}>
                        <Text style={styles.sectionTitle}>{I18n.t('latestArticles')}</Text>
                        <Text style={[styles.showMoreText, style.themedFontColor]}>{I18n.t('seeMore')}</Text>
                    </View>
                    <View style={styles.listCont}>
                        <FlatList 
                            contentContainerStyle={styles.list}
                            data={articles}
                            renderItem={({item})=>this.renderArticle(item)}
                            horizontal
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={style.sectionHead}>
                        <Text style={styles.sectionTitle}>{I18n.t('latestAddedBooks')}</Text>
                        <Text style={[styles.showMoreText, style.themedFontColor]}>{I18n.t('seeMore')}</Text>
                    </View>
                    <View style={styles.listCont}>
                        <FlatList 
                            contentContainerStyle={styles.list}
                            data={books}
                            renderItem={({item})=>this.renderBook(item)}
                            horizontal
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

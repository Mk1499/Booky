import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Header from '../../Components/Header/Header';
import SearchInput from '../../Components/SearchInput/SearchInput';
import SearchCard from '../../Components/SearchCard/SearchCard';

import {client} from '../../queries/queryClient';
import {searchQuery} from '../../queries/book';
import SearchEmpty from '../../Components/SearchEmpty/SearchEmpty';
import {getTheme} from '../../Services/themes';
import styles from './styles';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searched: false,
      bookResult: [],
      authorResult: [],
      searchQ: '',
    };
  }

  search = async (query) => {
    // // console.log('Q : ', query);
    if (query) {
      this.setState({
        searching: true,
        searched: true,
        searchQ: query,
      });
      await client
        .query({
          query: searchQuery,
          variables: {
            q: query,
          },
        })
        .then((res) => {
          // // console.log('Serch Res  : ', res.data);
          this.setState({
            searching: false,
            bookResult: res.data.search.books,
            authorResult: res.data.search.authors,
          });
        })
        .catch((err) => {
          this.setState({
            searching: false,
          });
          // console.log('search err  ', err);
        });
    }
  };

  renderBookItem = ({item}) => {
    let {push} = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => {
          push('BookDetails', {
            bookID: item.id,
          });
        }}>
        <SearchCard data={item} navigation={this.props.navigation} />
      </TouchableOpacity>
    );
  };

  render() {
    let style = {
      ...styles,
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    return (
      <View style={style.container}>
        <Header />
        <SearchInput searchFun={(q) => this.search(q)} />
        {this.state.searching ? (
          <View style={styles.loadContainer}>
            <Image
              source={require('../../../assets/images/logoAnimated.gif')}
              style={styles.loadImg}
              resizeMode={'contain'}
            />
          </View>
        ) : this.state.searched ? (
          this.state.bookResult.length ? (
            <FlatList
              contentContainerStyle={style.searchContent}
              data={this.state.bookResult}
              renderItem={this.renderBookItem}
            />
          ) : (
            <SearchEmpty type={1} name={this.state.searchQ} />
          )
        ) : (
          <SearchEmpty type={0} />
        )}
      </View>
    );
  }
}

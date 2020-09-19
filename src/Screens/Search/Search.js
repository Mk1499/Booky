import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  mainColor,
  textColor,
  subColor,
  height,
  width,
} from '../../configs/global';
import Header from '../../Components/Header/Header';
import SearchInput from '../../Components/SearchInput/SearchInput';
import SearchCard from '../../Components/SearchCard/SearchCard';

import {client} from '../../queries/queryClient';
import {searchQuery} from '../../queries/book';
import SearchEmpty from '../../Components/SearchEmpty/SearchEmpty';

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

  search = async query => {
    console.log('Q : ', query);
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
        .then(res => {
          console.log('Serch Res  : ', res.data);
          this.setState({
            searching: false,
            bookResult: res.data.search.books,
            authorResult: res.data.search.authors,
          });
        })
        .catch(err => {
          this.setState({
            searching: false,
          });
          console.log('search err  ', err);
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
    return (
      <View>
        <Header />
        <SearchInput searchFun={q => this.search(q)} />
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
              contentContainerStyle={styles.container}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0.05 * height,
    paddingBottom: 0.4 * height,
    // backgroundColor:'red'
  },
  loadImg: {
    width: 0.2 * width,
    height: 0.2 * height,
  },
  loadContainer: {
    width,
    height: 0.5 * height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

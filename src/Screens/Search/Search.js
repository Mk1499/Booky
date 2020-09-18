import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
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

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searched: false,
      bookResult: [],
      authorResult: [],
    };
  }

  search = async query => {
    console.log('Q : ', query);
    this.setState({
      searching: true,
      searched: true,
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
  };

  render() {
    return (
      <View>
        <Header />
        <SearchInput searchFun={q => this.search(q)} />
        <FlatList
          contentContainerStyle={styles.container}
          data={this.state.bookResult}
          renderItem={({item}) => <SearchCard data={item} />}
        />
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
});

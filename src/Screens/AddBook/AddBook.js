/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import Picker from '../../Components/Picker/Picker';
import ImageSelector from '../../Components/ImageUploader/ImageUploader';
import {Textarea} from 'native-base';

import {connect} from 'react-redux';
import {styles} from './style';
import {mainColor} from '../../configs/global';
import {client} from '../../queries/queryClient';
import {addBook} from '../../mutations/book';
import {RNToasty} from 'react-native-toasty';

class AddBook extends Component {
  static getDrivedStateFromProps(prevProps, nextProps) {
    console.log('new Props : ', prevProps, nextProps);
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      authorID: '',
      ownerID: '',
      description: '',
      category: '',
      coverURL: '',
      releaseDate: '',
      rate: 0,
      readURL: '',
      genreID: '',
      selectedAuthor: '',
      genres: [],
      addingBook: false,
    };
  }

  componentDidMount() {
    console.log('Redux Authors : ', this.props.authors);
    this.setState({
      authorID: this.props.authors[0]?.id,
      genreID: this.props.genres[0]?.id,
    });
  }

  componentDidUpdate() {
    console.log('Cmd will recieve props : ', this.props);
  }

  changeAuthor = (author) => {
    console.log('Change Item : ', author);
    if (author && author.id) {
      this.setState({
        authorID: author.id,
      });
    }
  };

  goBack() {
    let {navigation} = this.props;
    navigation.state.params.onGoBack();
    navigation.goBack();
  }

  changeGenre = (genre) => {
    console.log('Change Item : ', genre);

    if (genre && genre.id) {
      this.setState({
        genreID: genre.id,
      });
    }
  };

  addingBook = async () => {
    let {name, authorID, genreID, readURL, coverURL, description} = this.state;
    let {user} = this.props;
    let book = {
      name,
      authorID,
      genreID,
      readURL,
      coverURL,
    };

    console.log('Book Data : ', book);
    this.setState({
      addingBook: true,
    });
    await client
      .mutate({
        mutation: addBook,
        variables: {
          userID: user.id,
          authorID,
          name,
          description,
          readURL,
          genreID,
          coverURL,
        },
      })
      .then((data) => {
        console.log('Book Added Successfully : ', data);
        this.goBack();
        RNToasty.Success({
          title: 'Your Book Added Successfully',
        });
      })
      .catch((err) => {
        console.log('Fail adding new book : ', JSON.stringify(err));
        RNToasty.Error({
          title: 'Fail adding your book',
        });
      })
      .finally(() => {
        this.setState({
          addingBook: false,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}>
          <KeyboardAvoidingView behavior="position">
            <TextInput
              style={[styles.input]}
              placeholder="Book Name"
              keyboardType="default"
              onChangeText={(name) => {
                this.setState({name});
              }}
            />
          </KeyboardAvoidingView>
          <ImageSelector
            selectText="Upload Book PDF"
            selectType="pdf"
            change={(readURL) => {
              this.setState({readURL});
            }}
          />

          <Picker
            data={this.props.authors}
            change={(item) => this.changeAuthor(item)}
            label="Choose Author"
          />

          <Picker
            data={this.props.genres}
            change={(item) => this.changeGenre(item)}
            label="Choose Genre"
          />

          <ImageSelector
            selectText="Upload Book Cover"
            selectType="image"
            change={(coverURL) => {
              this.setState({coverURL});
            }}
          />
          <KeyboardAvoidingView behavior="position">
            <Textarea
              style={[styles.input]}
              placeholder="Description"
              keyboardType="default"
              placeholderTextColor={mainColor}
              rowSpan={4}
              onChangeText={(description) => {
                this.setState({description});
              }}
            />
          </KeyboardAvoidingView>

          <Button
            text="Add Book"
            processing={this.state.addingBook}
            action={() => this.addingBook()}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  authors: state.author.authors,
  genres: state.genre.genres,
  user: state.auth.userData,
});

export default connect(mapStateToProps, {})(AddBook);

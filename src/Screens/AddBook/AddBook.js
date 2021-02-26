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

class AddBook extends Component {
  static getDrivedStateFromProps(prevProps, nextProps) {
    console.log('new Props : ', prevProps, nextProps);
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      autherID: '',
      ownerID: '',
      description: '',
      category: '',
      releaseDate: '',
      rate: 0,
      readURL: '',
      genreID: '',
      selectedAuthor: '',
      genres: [],
    };
  }

  componentDidMount() {
    console.log('Redux Authors : ', this.props.authors);
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

  changeGenre = (genre) => {
    console.log('Change Item : ', genre);
    if (genre && genre.id) {
      this.setState({
        genreID: genre.id,
      });
    }
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
            <ImageSelector selectText="Upload Book PDF" selectType="pdf" />

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

            <ImageSelector selectText="Upload Book Cover" selectType="image" />

            {/* <KeyboardAvoidingView behavior="height"> */}
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
            processing={this.props.processing}
            // action={() => {
            //   props.loginLoading();
            //   props.login(email, password);
            // }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  authors: state.author.authors,
  genres: state.genre.genres,
});

export default connect(mapStateToProps, {})(AddBook);

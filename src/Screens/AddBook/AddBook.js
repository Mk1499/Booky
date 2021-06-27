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
import I18n, {getActiveLang} from '../../translate';
import SubHeader from '../../Components/SubHeader/SubHeader';
import {getTheme} from '../../Services/themes';
import PickerModal from '../../Components/PickerModal/PickerModal';
import MyAlert from '../../Components/MyAlert/MyAlert';

class AddBook extends Component {
  static getDrivedStateFromProps(prevProps, nextProps) {}

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      enName: '',
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
      showSuccessModal: false,
    };
  }

  componentDidMount() {
    // console.log('Redux Authors : ', this.props.authors);
    this.setState({
      authorID: this.props.authors[0]?.id,
      genreID: this.props.genres[0]?.id,
    });
  }

  componentDidUpdate() {
    // console.log('Cmd will recieve props : ', this.props);
  }

  changeAuthor = (author) => {
    // console.log('Change Item : ', author);
    if (author && author.id) {
      this.setState({
        authorID: author.id,
      });
    }
  };

  goBack() {
    let {navigation} = this.props;
    // navigation.state.params.onGoBack();
    navigation.goBack();
  }

  changeGenre = (genre) => {
    // console.log('Change Item : ', genre);

    if (genre && genre.id) {
      this.setState({
        genreID: genre.id,
      });
    }
  };

  addingBook = async () => {
    let {
      name,
      authorID,
      genreID,
      readURL,
      coverURL,
      description,
      enName,
    } = this.state;
    let {user} = this.props;
    let book = {
      name,
      authorID,
      genreID,
      readURL,
      coverURL,
    };

    // console.log('Book Data : ', book);
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
          enName,
          description,
          readURL,
          genreID,
          coverURL,
        },
      })
      .then((data) => {
        // console.log('Book Added Successfully : ', data);
        // this.goBack();
        this.setState({
          showSuccessModal: true,
        });
        RNToasty.Success({
          title: I18n.t('bookAdded'),
        });
      })
      .catch((err) => {
        // console.log('Fail adding new book : ', JSON.stringify(err));
        RNToasty.Error({
          title: I18n.t('addBookFail'),
        });
      })
      .finally(() => {
        this.setState({
          addingBook: false,
        });
      });
  };

  render() {
    let style = {
      ...styles,
      container: {...styles.container, backgroundColor: getTheme().background},
      inputBG: {
        backgroundColor: getTheme().background,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
      },
    };

    return (
      <View style={[style.container]}>
        {/* <Header /> */}
        <SubHeader
          noHeart={true}
          title={I18n.t('addBook')}
          goBack={() => this.goBack()}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}>
          <KeyboardAvoidingView behavior="position">
            <TextInput
              style={[styles.input, style.inputBG]}
              placeholder={I18n.t('arBookName')}
              keyboardType="default"
              onChangeText={(name) => {
                this.setState({name});
              }}
              placeholderTextColor={mainColor}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView behavior="position">
            <TextInput
              style={[styles.input, style.inputBG]}
              placeholder={I18n.t('enBookName')}
              keyboardType="default"
              onChangeText={(enName) => {
                this.setState({enName});
              }}
              placeholderTextColor={mainColor}
            />
          </KeyboardAvoidingView>
          <ImageSelector
            selectText={I18n.t('uploadPDF')}
            selectType="pdf"
            change={(readURL) => {
              this.setState({readURL});
            }}
          />
          <PickerModal
            label={I18n.t('chooseAuthor')}
            data={this.props.authors}
            action={(item) => this.changeAuthor(item)}
          />
          {/* <Picker
            data={this.props.authors}
            change={(item) => this.changeAuthor(item)}
            label={I18n.t('author')}
          /> */}

          {/* <Picker
            data={this.props.genres}
            change={(item) => this.changeGenre(item)}
            label={I18n.t('genre')}
          /> */}

          <PickerModal
            label={I18n.t('chooseGenre')}
            data={this.props.genres}
            action={(item) => this.changeGenre(item)}
          />
          <ImageSelector
            selectText={I18n.t('uploadBookCover')}
            selectType="image"
            change={(coverURL) => {
              this.setState({coverURL});
            }}
          />
          <KeyboardAvoidingView behavior="position">
            <Textarea
              style={[styles.input, style.inputBG]}
              placeholder={I18n.t('bookDesc')}
              keyboardType="default"
              placeholderTextColor={mainColor}
              rowSpan={4}
              onChangeText={(description) => {
                this.setState({description});
              }}
            />
          </KeyboardAvoidingView>

          <Button
            text={I18n.t('addBook')}
            processing={this.state.addingBook}
            action={() => this.addingBook()}
          />
        </ScrollView>
        <MyAlert
          visible={this.state.showSuccessModal}
          type="success"
          msg={I18n.t('bookAddedAndWaitForNote')}
          head={I18n.t('processSuccess')}
          action={() => {
            this.setState(
              {
                showSuccessModal: false,
              },
              () => {
                this.props.navigation.goBack();
              },
            );
          }}
        />
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

import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {styles} from './style';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';
import {mainColor} from '../../configs/global';
import I18n from '../../translate';

export default class ImageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: '',
      pdfName: '',
      uploading: false,
      task: null,
      uploadProgress: 0,
    };
  }

  componentDidMount() {}

  async selectImage() {
    let formData = new FormData();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      // formData.append('new-image', res);

      this.setState(
        {
          imageUri: res.uri,
        },
        () => {
          this.upload(res, 'image');
        },
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  async selectPDF() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      this.setState(
        {
          pdfName: res.name,
        },
        () => {
          this.upload(res, 'pdf');
        },
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  async cancelUpload() {
    if (this.task) {
      this.task.cancel();
      this.setState({
        uploadProgress: 0,
        uploading: false,
        imageUri: '',
        pdfName: '',
      });
    }
  }

  async upload(file, type) {
    this.setState({
      uploading: true,
    });
    let fileName = Math.random() * 1000 + file.name;
    let fileData = await RNFS.readFile(file.uri, 'base64');
    let reference;
    if (type === 'image') {
      reference = storage().ref(`booksCovers/${fileName}`);
    } else if (type === 'pdf') {
      reference = storage().ref(`booksPDFs/${fileName}`);
    }
    this.task = reference.putString(fileData, 'base64', {
      contentType: type === 'pdf' ? 'application/pdf' : 'image/jpg',
    });
    this.task
      .on('state_changed', async (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadProgress: progress.toFixed(0),
        });
        switch (snapshot.state) {
          case storage.TaskState.CANCELLED: // or 'paused'
            this.setState({
              uploadProgress: 0,
            });
            break;

          case storage.TaskState.SUCCESS:
            let url = await reference.getDownloadURL();
            this.props.change(url);
            this.setState({
              uploading: false,
            });
            break;
        }
      })
      .catch((err) => {
        console.log('upload err : ', err);
      });
  }

  render() {
    let {imageUri, pdfName, uploading, uploadProgress} = this.state;
    let {selectText, selectType} = this.props;
    if (!uploading) {
      return (
        <View style={styles.container}>
          {imageUri ? (
            <Image style={styles.img} source={{uri: imageUri}} />
          ) : pdfName ? (
            <Text style={styles.imgPath}>{pdfName}</Text>
          ) : (
            <Text style={styles.imgPath}>{selectText || 'Select Image'}</Text>
          )}
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => {
              if (selectType === 'image') {
                this.selectImage();
              } else {
                this.selectPDF();
              }
            }}>
            <Text style={styles.selectBtnText}>{I18n.t('select')}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator color={mainColor} size="large" />
          <Text style={{color: mainColor, fontFamily: 'Cairo'}}>
            {uploadProgress} % Uploaded
          </Text>
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => this.cancelUpload()}>
            <Text style={styles.selectBtnText}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

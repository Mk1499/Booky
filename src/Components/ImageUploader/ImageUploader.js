import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {styles} from './style';

export default class ImageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: '',
      pdfUri: '',
    };
  }

  componentDidMount() {}

  async selectImage() {
    let formData = new FormData();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      formData.append('new-image', res);

      this.setState({
        imageUri: res.uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  async selectPDF() {
    let formData = new FormData();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      formData.append('new-pdf', res);
      console.log('PDF RES : ', res);
      this.setState({
        pdfUri: res.uri,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  render() {
    let {imageUri, pdfUri} = this.state;
    let {selectText, selectType} = this.props;
    return (
      <View style={styles.container}>
        {imageUri ? (
          <Image style={styles.img} source={{uri: imageUri}} />
        ) : pdfUri ? (
          <Text style={styles.imgPath}>{pdfUri}</Text>
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
          <Text style={styles.selectBtnText}>Select</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

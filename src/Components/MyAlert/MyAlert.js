import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import I18n from '../../translate';

export default class MyAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   visible: true,
    };
  }

  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

  defineImg = (type) => {
    switch (type) {
      case 'success':
        return require('../../../assets/images/success.png');
    }
  };

  render() {
    // let {visible} = this.state;
    let {head, msg, type, action, visible} = this.props;

    let img = this.defineImg(type);

    return (
      <View style={styles.container}>
        <Modal
          isVisible={visible}
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}
          useNativeDriver={true}>
          <View style={styles.content}>
            <Image style={styles.img} source={img} />
            <Text style={styles.header}> {head} </Text>
            <Text style={styles.msg}>{msg}</Text>
            <TouchableOpacity style={styles.actionBtn} onPress={() => action()}>
              <Text style={styles.actionText}> {I18n.t('ok')} </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  DevSettings,
  AsyncStorage,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'native-base';
import styles from './style';
import I18n from '../../translate';
import RNRestart from 'react-native-restart';

export default class LangsModal extends Component {
  constructor(props) {
    super(props);
    console.log('Change Lange Props : ', props);
    this.state = {
      langs: [
        {
          id: 'en-US',
          name: 'English',
          cover:
            'https://ak.picdn.net/shutterstock/videos/21981466/thumb/1.jpg',
        },
        {
          id: 'ar-EG',
          name: 'العربية',
          cover: 'https://s1.1zoom.me/big0/949/331097-alexfas01.jpg',
        },
      ],

      visible: this.props.visible,
    };
  }

  changeLanguage = (id) => {
    let {changeAction} = this.props;
    if (I18n.locale !== id) {
      I18n.locale = id;
      AsyncStorage.setItem('Lang', id);
      RNRestart.Restart();
      //   changeAction();
      // DevSettings.reload();

      //   navigation.popToTop();
    }
  };

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  renderShelfItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.langRow}
      onPress={() => {
        this.changeLanguage(item.id);
      }}>
      <View style={styles.row}>
        <Image source={{uri: item.cover}} style={styles.langCover} />
        <Text
          style={
            I18n.locale === item.id ? styles.langName : styles.activeLangName
          }>
          {item.name}
        </Text>
      </View>
      {I18n.locale === item.id ? (
        <Icon
          name="check"
          style={styles.langAddIcon}
          onPress={this.props.hideModal}
          type="Entypo"
        />
      ) : null}
    </TouchableOpacity>
  );

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('Changeeee : ', nextProps.visible, prevState.visible);
    if (nextProps.visible !== prevState.visible) {
      return {
        visible: nextProps.visible,
      };
    } else return null;
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.visible}
          onBackdropPress={this.props.hideModal}
          onBackButtonPress={this.props.hideModal}
          useNativeDriver={true}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.headerView}>
                <Text style={styles.header}>{I18n.t('changeLang')}</Text>
              </View>
              <View style={styles.langList}>
                <FlatList
                  data={this.state.langs}
                  renderItem={this.renderShelfItem}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

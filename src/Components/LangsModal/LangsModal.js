import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  DevSettings,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from 'react-native-modal';
import {Icon} from 'native-base';
import styles from './style';
import I18n, {setActiveLang} from '../../translate';
import RNRestart from 'react-native-restart';
import {getTheme} from '../../Services/themes';

export default class LangsModal extends Component {
  constructor(props) {
    super(props);
    // console.log('Change Lange Props : ', props);
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
    let lang = id.slice(0, 2);
    let {changeAction} = this.props;
    if (I18n.locale !== id) {
      // console.log('Lang ID : ', lang);
      setActiveLang(lang);
      AsyncStorage.setItem('locale', id).then(() => {
        // DevSettings.reload();
        // RNRestart.Restart();
        changeAction();
      });

      // navigation.popToTop();
    }
  };

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  renderShelfItem = ({item, index}) => {
    let style = {
      langName: {...styles.langName, color: getTheme().text},
      activeLangName: {...styles.activeLangName, color: getTheme().primary},
      langRow: {...styles.langRow, borderColor: getTheme().border},
    };
    return (
      <TouchableOpacity
        style={style.langRow}
        onPress={() => {
          this.changeLanguage(item.id);
        }}>
        <View style={styles.row}>
          <Image source={{uri: item.cover}} style={styles.langCover} />
          <Text
            style={
              I18n.locale === item.id ? style.activeLangName : style.langName
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
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // // console.log('Changeeee : ', nextProps.visible, prevState.visible);
    if (nextProps.visible !== prevState.visible) {
      return {
        visible: nextProps.visible,
      };
    } else return null;
  }

  render() {
    let style = {
      content: {
        ...styles.content,
        backgroundColor: getTheme().background,
      },
    };
    return (
      <View>
        <Modal
          isVisible={this.state.visible}
          onBackdropPress={this.props.hideModal}
          onBackButtonPress={this.props.hideModal}
          useNativeDriver={true}>
          <View style={styles.container}>
            <View style={style.content}>
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

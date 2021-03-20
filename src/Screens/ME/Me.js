import React, {Component} from 'react';
import {View} from 'react-native';
import I18n from '../../translate';

import styles from './styles';

import ActionHeader from '../../Components/ActionHeader/ActionHeader';
import UserHead from '../../Components/UserHead/UserHead';
import UserRecords from '../../Components/UserRecords/UserRecords';
import SettingList from '../../Components/SettingList/SettingList';
import LangsModal from '../../Components/LangsModal/LangsModal';

export default class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        {
          text: I18n.t('yourFavBooks'),
          iconName: 'hearto',
          iconType: 'AntDesign',
          action: 'FavBooks',
        },
        {
          text: I18n.t('addedBooks'),
          iconName: 'add-circle-outline',
          iconType: 'MaterialIcons',
          action: 'FavBooks',
        },
        {
          text: I18n.t('yourFavAuthors'),
          iconName: 'person-outline',
          iconType: 'Ionicons',
          action: 'FavBooks',
        },
        {
          text: I18n.t('changeLang'),
          iconName: 'language-outline',
          iconType: 'Ionicons',
          action: this.toggleLangModal,
        },
        {
          text: I18n.t('logout'),
          iconName: 'logout',
          iconType: 'AntDesign',
          action: 'FavBooks',
          redText: true,
        },
      ],
      langModal: false,
    };
  }

  toggleLangModal = () => {
    this.setState({
      langModal: !this.state.langModal,
    });
  };

  changeLang = () => {
    let {navigation} = this.props;
    navigation.reset({
      index: 0,
      routes: [{name: 'main'}],
    });
  };

  render() {
    let {menuItems, langModal} = this.state;
    let {navigation} = this.props;
    return (
      <View style={styles.container}>
        <ActionHeader />
        <UserHead />
        <UserRecords />
        <SettingList items={menuItems} />
        <LangsModal
          visible={langModal}
          hideModal={this.toggleLangModal}
          changeAction={this.changeLang}
        />
      </View>
    );
  }
}

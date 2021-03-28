import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

import I18n, {getActiveLang} from '../../translate';

import styles from './styles';
import {CommonActions} from '@react-navigation/native';

import ActionHeader from '../../Components/ActionHeader/ActionHeader';
import UserHead from '../../Components/UserHead/UserHead';
import UserRecords from '../../Components/UserRecords/UserRecords';
import SettingList from '../../Components/SettingList/SettingList';
import LangsModal from '../../Components/LangsModal/LangsModal';

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        {
          text: I18n.t('yourFavBooks'),
          iconName: 'hearto',
          iconType: 'AntDesign',
          action: () => {},
        },
        {
          text: I18n.t('addedBooks'),
          iconName: 'add-circle-outline',
          iconType: 'MaterialIcons',
          action: () => {},
        },
        {
          text: I18n.t('yourFavAuthors'),
          iconName: 'person-outline',
          iconType: 'Ionicons',
          action: () => {},
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
          action: this.logout,
          redText: true,
        },
      ],
      langModal: false,
    };
    console.log('me Props : ', this.props);
  }

  toggleLangModal = () => {
    this.setState({
      langModal: !this.state.langModal,
    });
  };

  changeLang = () => {
    let {navigation} = this.props;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainTab'}],
      }),
    );
  };

  logout = () => {
    this.props.logout(this.props.userData.id);
  };

  render() {
    let {menuItems, langModal} = this.state;
    let {navigation, userData} = this.props;
    return (
      <View style={styles.container}>
        <ActionHeader />
        <UserHead user={userData} />
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

const mapPropsToState = (state) => ({
  userData: state.auth.userData,
  userID: state.auth.userID,
});

export default connect(mapPropsToState, {
  logout,
})(Me);

import React, {Component} from 'react';
import {StatusBar, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

import I18n, {getActiveLang} from '../../translate';
import {changeTheme, getTheme} from '../../Services/themes';
import styles from './styles';
import {CommonActions} from '@react-navigation/native';

import ActionHeader from '../../Components/ActionHeader/ActionHeader';
import UserHead from '../../Components/UserHead/UserHead';
import UserRecords from '../../Components/UserRecords/UserRecords';
import SettingList from '../../Components/SettingList/SettingList';
import LangsModal from '../../Components/LangsModal/LangsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from '../../queries/queryClient';
import {updateUserLangMutation, updateUserMutation} from '../../mutations/user';

class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [ 
        {
          id: 0,
          text: I18n.t('yourFavBooks'),
          iconName: 'hearto',
          iconType: 'AntDesign',
          action: () => this.goToScreen('FavBooks'),
        },
        {
          id: 1,
          text: I18n.t('addedBooks'),
          iconName: 'add-circle-outline',
          iconType: 'MaterialIcons',
          action: () => this.goToScreen('AddedBooks'),
        },
        {
          id: 2,
          text: I18n.t('yourFavAuthors'),
          iconName: 'person-outline',
          iconType: 'Ionicons',
          action: () => this.goToScreen('FavAuthors'),
        },
        {
          id: 3,
          text: I18n.t('changeLang'),
          iconName: 'language-outline',
          iconType: 'Ionicons',
          action: this.toggleLangModal,
        },
        {
          id: 4,
          text: I18n.t('changeTheme'),
          iconName: 'theme-light-dark',
          iconType: 'MaterialCommunityIcons',
          action: this.changeTheme,
        },
        {
          id: 5,
          text: I18n.t('logout'),
          iconName: 'logout',
          iconType: 'AntDesign',
          action: this.logout,
          redText: true,
        },
      ],
      langModal: false,
    };
    // console.log('me Props : ', this.props);
  }

  componentDidMount() {
    // console.log('Active Theme : ', getTheme());
  }

  toggleLangModal = () => {
    this.setState({
      langModal: !this.state.langModal,
    });
  }; 

  changeLang = (newLang) => {
    console.log("NEW LAng  : ", newLang);
    this.resetApp();
    this.updateUserLang(newLang)
  };  

  updateUserLang = async (newLang) => {
    let {userData} = this.props;

    await client.mutate({
      mutation: updateUserLangMutation,
      variables: {
        userID: userData.id,
        lang: newLang,
      },
    });
  };

  changeTheme = () => {
    changeTheme();
    this.resetApp();
    // this.setState({});
  };

  goToScreen = (screenName) => {
    this.props.navigation.navigate(screenName);
  };

  resetApp() {
    let {navigation} = this.props;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainTab'}],
      }),
    );
  }

  editProfile = () => {};

  logout = async () => {
    this.props.logout(this.props.userData.id);
  };

  render() {
    let {menuItems, langModal} = this.state;
    let {navigation, userData} = this.props;

    let style = {
      ...styles,
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    return (
      <ScrollView style={[style.container]}>
        <ActionHeader action={() => this.goToScreen('EditProfile')} />
        <UserHead user={userData} />
        <UserRecords />
        <SettingList items={menuItems} />
        <LangsModal
          visible={langModal}
          hideModal={this.toggleLangModal}
          changeAction={(lang)=> this.changeLang(lang)}
        />
      </ScrollView>
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

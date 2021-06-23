import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../Stacks/HomeStack';
import SearchStack from '../Stacks/SearchStack';
import ProfileStack from '../Stacks/ProfileStack';
import I18n from '../../translate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base';
import {mainColor, height} from '../../configs/global';
import {getTheme} from '../../Services/themes';

const Tab = createBottomTabNavigator();
export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      explore: I18n.t('explore'),
      search: I18n.t('search'),
      profile: I18n.t('profile'),
    };
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('locale').then((locale) => {
      if (locale === 'ar-EG') {
        this.setState({
          explore: I18n.translations.ar.explore,
          search: I18n.translations.ar.search,
          profile: I18n.translations.ar.profile,
        });
      } else {
        this.setState({
          explore: I18n.translations.en.explore,
          search: I18n.translations.en.search,
          profile: I18n.translations.en.profile,
        });
      }
    });
  };

  getTabBarVisibility = (route) => {
    // console.log('R : ', route);
    let index = route.state?.index || 0;
    if (index === 0) {
      return true;
    }
    return false;
  };

  render() {
    let {explore, search, profile} = this.state;

    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: mainColor,
          inactiveTintColor: 'grey',
          style:{margin:0},
          labelStyle: {
            fontFamily: 'Cairo',
            fontSize: 12,
          },
          tabStyle: {
            borderTopWidth: 2,
            borderColor: mainColor,
            backgroundColor: getTheme().background,
            marginTop:-0.001 * height
          },
        }}
        >
        <Tab.Screen
          name={explore}
          component={HomeStack}
          options={({route}) => {
            // console.log('Ex Route : ', route);
            return {
              tabBarIcon: ({color}) => {
                return (
                  <Icon
                    name="explore"
                    type="MaterialIcons"
                    style={{color: color, fontSize: 20}}
                  />
                );
              },
              tabBarVisible: this.getTabBarVisibility(route),
            };
          }}
        />
        <Tab.Screen
          name={search}
          component={SearchStack}
          options={({route}) => {
            return {
              tabBarIcon: ({color}) => {
                return (
                  <Icon
                    name="search"
                    type="Feather"
                    style={{color: color, fontSize: 20}}
                  />
                );
              },
              tabBarVisible: this.getTabBarVisibility(route),
            };
          }}
        />
        <Tab.Screen
          name={profile}
          component={ProfileStack}
          options={({route}) => {
            return {
              tabBarIcon: ({color}) => {
                return (
                  <Icon
                    name="user"
                    type="AntDesign"
                    style={{color: color, fontSize: 20}}
                  />
                );
              },
              tabBarVisible: this.getTabBarVisibility(route),
            };
          }}
        />
      </Tab.Navigator>
    );
  }
}

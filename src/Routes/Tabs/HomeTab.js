import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../Stacks/HomeStack';
import SearchStack from '../Stacks/SearchStack';
import ProfileStack from '../Stacks/ProfileStack';
import I18n from '../../translate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base';
import {mainColor, subColor} from '../../configs/global';

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
      if (locale === 'en-US') {
        this.setState({
          explore: I18n.translations.en.explore,
          search: I18n.translations.en.search,
          profile: I18n.translations.en.profile,
        });
      } else {
        this.setState({
          explore: I18n.translations.ar.explore,
          search: I18n.translations.ar.search,
          profile: I18n.translations.ar.profile,
        });
      }
    });
  };

  render() {
    let {explore, search, profile} = this.state;

    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: mainColor,
          inactiveTintColor: 'grey',
          labelStyle: {
            fontFamily: 'Cairo',
            fontSize: 12,
          },
          tabStyle: {
            borderTopWidth: 2,
            borderColor: mainColor,
          },
        }}>
        <Tab.Screen
          name={explore}
          component={HomeStack}
          options={{
            tabBarIcon: ({color}) => {
              return (
                <Icon
                  name="explore"
                  type="MaterialIcons"
                  style={{color: color, fontSize: 20}}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={search}
          component={SearchStack}
          options={{
            tabBarIcon: ({color}) => {
              return (
                <Icon
                  name="search"
                  type="Feather"
                  style={{color: color, fontSize: 20}}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={profile}
          component={ProfileStack}
          options={{
            tabBarIcon: ({color}) => {
              return (
                <Icon
                  name="user"
                  type="AntDesign"
                  style={{color: color, fontSize: 20}}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}

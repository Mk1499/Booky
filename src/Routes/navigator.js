import React from 'react';
import {createAppContainer} from 'react-navigation';
// import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {mainColor, bgColor} from '../configs/global';

import Home from '../Screens/Home/Home';
import SignUp from '../Screens/SignUp/SignUp';
import Library from '../Screens/Library/Library';
import Profile from '../Screens/Profile/Profile';
import Search from '../Screens/Search/Search';
import BookDetails from '../Screens/BookDetails/BookDetails';
import Genre from '../Screens/Genre/GenreScreen';
import AuthorProfile from '../Screens/AuthorProfile/AuthorProfile';

import {Icon} from 'native-base';
// const {width} = Dimensions.get('window');

// Stacks

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: null,
      header: null,
    }),
  },
  BookDetails: {
    screen: BookDetails,
    navigationOptions: () => ({
      headerTitle: null,
      header: null,
    }),
  },
  Genre: {
    screen: Genre,
    navigationOptions: () => ({
      headerTitle: null,
      header: null,
    }),
  },
  AuthorProfile: {
    screen: AuthorProfile,
    navigationOptions: () => ({
      headerTitle: null,
      header: null,
    }),
  },
});

const LibraryStack = createStackNavigator({
  Library: {
    screen: Library,
    navigationOptions: () => ({
      headerTitle: null,
      header: null,
    }),
  },
});
const ProfileStack = createStackNavigator({
  Library: {
    screen: Profile,
    navigationOptions: () => ({
      headerTitle: null,
      header: null,
    }),
  },
});
const SearchStack = createStackNavigator({
  Library: {
    screen: Search,
    navigationOptions: () => ({
      headerTitle: null,
      header: null,
    }),
  },
});

const mainBtm = createBottomTabNavigator(
  {
    Explore: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="explore"
              type="MaterialIcons"
              style={{color: tintColor, fontSize: 20}}
            />
          );
        },
        headerTitle: 'Movies',
      },
    },
    Library: {
      screen: LibraryStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="library-outline"
              style={{color: tintColor, fontSize: 20}}
            />
          );
        },
        headerTitle: 'Your Library',
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="search"
              type="Feather"
              style={{color: tintColor, fontSize: 20}}
            />
          );
        },
        headerTitle: 'Your Library',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="profile"
              type="AntDesign"
              style={{color: tintColor, fontSize: 20}}
            />
          );
        },
        headerTitle: 'Your Library',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: mainColor,
      labelStyle: {
        fontSize: 12,
      },
      inactiveTintColor: 'grey',
      style: {
        borderTopWidth: 2,
        backgroundColor: bgColor,
        borderTopColor: mainColor,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 52,
        },
        shadowOpacity: 0.8,
        shadowRadius: 15.19,
        elevation: 23,
      },
    },
  },
);

const main = createStackNavigator({
  //   Splash: {
  //     screen: Splash,
  //     navigationOptions: {
  //       header: null,
  //     },
  //   },
  //   Login: {
  //     screen: Login,
  //     navigationOptions: {
  //       header: null,
  //     },
  //   },
  //   SignUp: {
  //     screen: SignUp,
  //     navigationOptions: {
  //       header: null,
  //     },
  //   },
  Home: {
    screen: mainBtm,
    navigationOptions: {
      header: null,
    },
  },
});

// const screens = createStackNavigator({ main }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(main);
export default AppNavigation;

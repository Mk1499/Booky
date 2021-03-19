import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {mainColor, bgColor} from '../configs/global';
import I18n from '../translate';

import Home from '../Screens/Home/Home';
import SignUp from '../Screens/Register/Register';
import Login from '../Screens/Login/Login';
import Library from '../Screens/Library/Library';
import Profile from '../Screens/Profile/Profile';
import Search from '../Screens/Search/Search';
import BookDetails from '../Screens/BookDetails/BookDetails';
import Genre from '../Screens/Genre/GenreScreen';
import AuthorProfile from '../Screens/AuthorProfile/AuthorProfile';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import PDF from '../Screens/PDF/PDF';
import AddBook from '../Screens/AddBook/AddBook';

import {Icon} from 'native-base';
// const {width} = Dimensions.get('window');

// Stacks

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  AddBook: {
    screen: AddBook,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  BookDetails: {
    screen: BookDetails,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  PDF: {
    screen: PDF,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  Genre: {
    screen: Genre,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  AuthorProfile: {
    screen: AuthorProfile,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
});



const LibraryStack = createStackNavigator({
  Library: {
    screen: Library,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
});
const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  BookDetails: {
    screen: BookDetails,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  AuthorProfile: {
    screen: AuthorProfile,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
});
const SearchStack = createStackNavigator({
  Library: {
    screen: Search,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  BookDetails: {
    screen: BookDetails,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
  AuthorProfile: {
    screen: AuthorProfile,
    navigationOptions: () => ({
      headerTitle: null,
      headerShown: false,
    }),
  },
});



HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

SearchStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

ProfileStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

// HomeStack.navigationOptions = ({navigation}) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

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
        headerTitle: '',
        title: I18n.t('explore'),
      },
    },
    // Library: {
    //   screen: LibraryStack,
    //   navigationOptions: {
    //     tabBarIcon: ({tintColor}) => {
    //       return (
    //         <Icon
    //           name="library-outline"
    //           style={{color: tintColor, fontSize: 20}}
    //         />
    //       );
    //     },
    //     headerTitle: 'Your Library',
    //   },
    // },
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
        title: I18n.t('search'),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return (
            <Icon
              name="user"
              type="AntDesign"
              style={{color: tintColor, fontSize: 20}}
            />
          );
        },
        headerTitle: 'Your Library',
        title: I18n.t('profile'),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: mainColor,
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Cairo',
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
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: mainBtm,
    navigationOptions: {
      headerShown: false,
    },
  },
});

// const screens = createStackNavigator({ main }, { defaultNavigationOptions: { headerShown: false } })

const AppNavigation = createAppContainer(main);
export default AppNavigation;

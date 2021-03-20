import React, {useEffect, Component} from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './src/Routes/navigator';
import NavigationService from './src/Routes/NavigationServices';
import {mainColor} from './src/configs/global';
import {Provider} from 'react-redux';
import store from './src/store';
import {baseURL} from './src/configs/global';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {
  requestUserPermission,
  backgroundMsgs,
  forgroundMsgd,
} from './src/Services/firebaseMessaging';
import messaging from '@react-native-firebase/messaging';

import I18n from './src/translate';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

// const App = () => {
// function haOnEvent() {
//   // alert("ddd")

//   const eventObj = {
//     testString: 'StrContent',
//     testInt: 20,
//     testDouble: 2.2,
//     testBoolean: false,
//   };
// }

// useEffect(() => {
//   haOnEvent();
// });

// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount = async () => {
    // alert('Hello');
    await AsyncStorage.getItem('Lang').then((lang) => {
      I18n.locale = lang || 'ar-EG';
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    let {loading} = this.state;

    return (
      !loading && (
        <Provider store={store}>
          <StatusBar backgroundColor={mainColor} />
          <ApolloProvider client={client}>
            <AppNavigation
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </ApolloProvider>
        </Provider>
      )
    );
  }
}

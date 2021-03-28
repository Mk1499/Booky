import React, {useEffect, Component} from 'react';
import {StatusBar} from 'react-native';
// import AppNavigation from './src/Routes/navigator';
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
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/Routes/Stacks/Main';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('locale').then((locale) => {
      I18n.locale = locale || 'ar-EG';
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    let {loading} = this.state;
    if (!loading) {
      return (
        <Provider store={store}>
          <StatusBar backgroundColor={mainColor} />
          <ApolloProvider client={client}>
            {/* <AppNavigation
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            /> */}
            <NavigationContainer
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}>
              <MainStack />
            </NavigationContainer>
          </ApolloProvider>
        </Provider>
      );
    } else {
      return null;
    }
  }
}

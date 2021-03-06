import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './src/Routes/navigator';
import NavigationService from './src/Routes/NavigationServices';
import {mainColor} from './src/configs/global';
import {Provider} from 'react-redux';
import store from './src/store';
import {baseURL} from './src/configs/global';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import haSDK from 'react-native-ha-interface';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

const App = () => {
  // function haOnEvent() {
  //   // alert("ddd")
    
  //   const eventObj = {
  //     testString: 'StrContent',
  //     testInt: 20,
  //     testDouble: 2.2,
  //     testBoolean: false,
  //   };
  //   haSDK.onEvent(haSDK.STARTAPP, eventObj);
  // }

  useEffect(() => {
    // haOnEvent();
  });

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={mainColor} />
      <ApolloProvider client={client}>
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ApolloProvider>
    </Provider>
  );
};

export default App;

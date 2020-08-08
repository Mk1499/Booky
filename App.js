import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './src/Routes/navigator';
import NavigationService from './src/Routes/NavigationServices';
import {mainColor} from './src/configs/global';
import {Provider} from 'react-redux';
import store from './src/store';
import {baseURL} from './src/configs/global';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

const App = () => {
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

import React, {Component} from 'react';
import { StatusBar} from 'react-native';
import AppNavigation from './src/Routes/navigator';
import NavigationService from './src/Routes/NavigationServices';
// import {mainColor, textColor} from './src/configs/global';
import {Provider} from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <AppNavigation
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

export default App;

import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeTab from '../Tabs/HomeTab';
import Login from '../../Screens/Login/Login';
import SignUp from '../../Screens/Register/Register';
import SplashScreen from '../../Screens/SplashScreen/SplashScreen';

const Stack = createStackNavigator();

export default class MainStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainTab"
          component={HomeTab}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

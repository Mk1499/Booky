import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeTab from '../Tabs/HomeTab';

const Stack = createStackNavigator();

export default class MainStack extends Component {
  render() {
    return (
      <Stack.Navigator>
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

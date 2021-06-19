import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Me from '../../Screens/ME/Me';
import BookDetails from '../../Screens/BookDetails/BookDetails';
import AuthorProfile from '../../Screens/AuthorProfile/AuthorProfile';
import EditProfile from '../../Screens/EditProfile/EditProfile';

const Stack = createStackNavigator();

export default class ProfileStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Me}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerTitle: null, headerShown: false}}
        />
        {/* <Stack.Screen
          name="AuthorProfile"
          component={AuthorProfile}
          options={{headerTitle: null, headerShown: false}}
        /> */}
      </Stack.Navigator>
    );
  }
}

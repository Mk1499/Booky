import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../Screens/Search/Search';
import BookDetails from '../../Screens/BookDetails/BookDetails';
import AuthorProfile from '../../Screens/AuthorProfile/AuthorProfile';
import BookComments from '../../Screens/BookComments/BookComments';

const Stack = createStackNavigator();

export default class SearchStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="BookComments"
          component={BookComments}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="AuthorProfile"
          component={AuthorProfile}
          options={{headerTitle: null, headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}

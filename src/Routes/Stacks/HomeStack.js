import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';
import AddBook from '../../Screens/AddBook/AddBook';
import BookDetails from '../../Screens/BookDetails/BookDetails';
import PDF from '../../Screens/PDF/PDF';
import GenreScreen from '../../Screens/Genre/GenreScreen';
import AuthorProfile from '../../Screens/AuthorProfile/AuthorProfile';
import AddBookComment from '../../Screens/AddBookComment/AddBookComment';
import BookComments from '../../Screens/BookComments/BookComments';
import UserProfile from '../../Screens/UserProfile/UserProfile';

const Stack = createStackNavigator();

export default class HomeStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="AddBookComment"
          component={AddBookComment}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="BookComments"
          component={BookComments}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="PDF"
          component={PDF}
          options={{headerTitle: null, headerShown: false}}
        />

        <Stack.Screen
          name="Genre"
          component={GenreScreen}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="AuthorProfile"
          component={AuthorProfile}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen 
          name="UserProfile"
          component={UserProfile}
          options={{headerTitle: null, headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}

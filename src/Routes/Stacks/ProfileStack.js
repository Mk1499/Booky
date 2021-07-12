import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Me from '../../Screens/ME/Me';
import BookDetails from '../../Screens/BookDetails/BookDetails';
import AuthorProfile from '../../Screens/AuthorProfile/AuthorProfile';
import EditProfile from '../../Screens/EditProfile/EditProfile';
import FavAuthors from '../../Screens/FavAuthors/FavAuthors';
import FavBooks from '../../Screens/FavBooks/FavBooks';
import AddedBooks from '../../Screens/AddedBooks/AddedBooks';
import BookComments from '../../Screens/BookComments/BookComments';
import UserProfile from '../../Screens/UserProfile/UserProfile';
import UserArticles from '../../Screens/UserArticles/UserArticles';
import Followers from '../../Screens/Followers/Followers';

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
        <Stack.Screen
          name="FavAuthors"
          component={FavAuthors}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="FavBooks"
          component={FavBooks}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="AddedBooks"
          component={AddedBooks}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="AuthorProfile"
          component={AuthorProfile}
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
          name="UserProfile"
          component={UserProfile}
          options={{headerTitle: null, headerShown: false}}
        />
         <Stack.Screen 
          name="UserArticles"
          component={UserArticles}
          options={{headerTitle: null, headerShown: false}}
        />
        <Stack.Screen
          name="UserFollowers"
          component={Followers}
          options={{headerTitle: null, headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}

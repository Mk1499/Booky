import {RNToasty} from 'react-native-toasty';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
  addBookToFavMutation,
  removeBookFromFavMutation,
} from '../mutations/book';
import {baseURL} from '../configs/global';
import {SETBOOKREAD, UPDATEFAVBOOKS} from '../actions/types';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

export const addBookToFav = (userID, bookID) => async (dispatch) => {
  await client
    .mutate({
      mutation: addBookToFavMutation,
      variables: {
        userID,
        bookID,
      },
    })
    .then((res) => {
    })
    .catch((err) => {
    });
};

export const setCurrentRead = (readData) => (dispatch) => {
  dispatch({
    type: SETBOOKREAD,
    payload: readData,
  });
};

export const updateFavBooksAction = (favBooks) => (dispatch) => {
  dispatch({
    type: UPDATEFAVBOOKS,
    payload: favBooks,
  });
};

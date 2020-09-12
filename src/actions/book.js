import {RNToasty} from 'react-native-toasty';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
  addBookToFavMutation,
  removeBookFromFavMutation,
} from '../mutations/book';
import {baseURL} from '../configs/global';
import {SETBOOKREAD} from '../actions/types';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

export const addBookToFav = (userID, bookID) => async dispatch => {
  console.log('adding Book with id : ', bookID, ' for user with ID : ', userID);
  await client
    .mutate({
      mutation: addBookToFavMutation,
      variables: {
        userID,
        bookID,
      },
    })
    .then(res => {
      console.log('book fav res : ', res);
    })
    .catch(err => {
      console.log('add to fav error : ', err);
    });
};

export const setCurrentRead = readData =>  dispatch => {
  console.log("Read Data action : ", readData);
  dispatch({
    type: SETBOOKREAD,
    payload: readData,
  });
};

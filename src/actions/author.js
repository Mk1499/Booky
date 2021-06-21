import {client} from '../queries/queryClient';
import {addAuthorToFavMutation} from '../mutations/author';

import {SETAUTHORS} from './types';

export const addAuthorToFav = (userID, authorID) => async (dispatch) => {
  await client
    .mutate({
      mutation: addAuthorToFavMutation,
      variables: {
        userID,
        authorID,
      },
    })
    .then((res) => {
      // // console.log('Fav');
    });
};

export const setAuthors = (authors) => async (dispatch) => {
  // console.log('set authors action Called : ', authors);
  dispatch({
    type: SETAUTHORS,
    payload: authors,
  });
};

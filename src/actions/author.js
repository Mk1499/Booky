import {client} from '../queries/queryClient';
import {addAuthorToFavMutation} from '../mutations/author';

export const addAuthorToFav = (userID, authorID) => async dispatch => {
  await client
    .mutate({
      mutation: addAuthorToFavMutation,
      variables: {
        userID,
        authorID,
      },
    })
    .then(res => {
      console.log('Fav');
    });
};

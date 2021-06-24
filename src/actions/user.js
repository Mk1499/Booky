import {client} from '../queries/queryClient';
import {getUserFavs} from '../queries/user';
import {UPDATEFAVAUTHORS, UPDATEFAVBOOKS} from './types';

export const getUserFavsAction = (userID) => (dispatch) => {
  client
    .query({
      query: getUserFavs,
      variables: {
        userID,
      },
    })
    .then(({data}) => {
      let {favBooks, favAuthors} = data.user;
      let favBooksIDs = favBooks.map(({book}) => book.id);
      let favAuthorsIDs = favAuthors.map(({author}) => author.id);
      dispatch({
        type: UPDATEFAVBOOKS,
        payload: favBooksIDs,
      });
      dispatch({
        type: UPDATEFAVAUTHORS,
        payload: favAuthorsIDs,
      });
    });
};

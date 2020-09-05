import {gql} from '@apollo/client';

export const addBookToFavMutation = gql`
  mutation($userID: String!, $bookID: String!) {
    addBookFav(userID: $userID, bookID: $bookID) {
      id
    }
  }
`;

export const removeBookFromFavMutation = gql`
  mutation($id: ID!) {
    removeBookFav(id: $id) {
      id
    }
  }
`;


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

export const addBookReadMutation = gql`
  mutation($userID: String!, $bookID: String!, $lastPage: Int!) {
    addBookRead(userID: $userID, bookID: $bookID, lastPage: $lastPage) {
      id
      user {
        id
        name
      }
      book {
        id
        name
      }
      lastPage
      time
    }
  }
`;

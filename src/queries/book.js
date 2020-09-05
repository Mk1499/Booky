import {gql} from '@apollo/client';

export const checkBookFavQuery = gql`
  query($userID: String!, $bookID: String!) {
    checkBookFav(userID: $userID, bookID: $bookID) {
      id
    }
  }
`;

export const getFavBooksQuery = gql`
  query($userID: String!) {
    favBooks(userID: $userID) {
      id
      book {
        id
        name
        posterURL
        author {
          name
        }
      }
    }
  }
`;

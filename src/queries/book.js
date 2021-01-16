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

export const checkBookRead = gql`
  query($userID: String!, $bookID: String!) {
    checkBookRead(userID: $userID, bookID: $bookID) {
      id
      lastPage
      time
    }
  }
`;

export const searchQuery = gql`
  query($q: String!) {
    search(query: $q) {
      books {
        id
        name
        rate
        posterURL
        author {
          id
          name
        }
      }
      authors {
        id
        name
      }
    }
  }
`;

import {gql} from '@apollo/client';

export const getUserAddedBooksQuery = gql`
  query($userID: ID!) {
    user(id: $userID) {
      addedBooks {
        id
        name
        enName
        posterURL
        rate
      }
    }
  }
`;

export const getUserFavs = gql`
  query($userID: ID!) {
    user(id: $userID) {
      favBooks {
        book {
          id
        }
      }
      favAuthors {
        author {
          id
        }
      }
    }
  }
`;

import {gql} from '@apollo/client';

export const getUserAddedBooksQuery = gql`
  query($userID: ID!) {
    user(id: $userID) {
      addedBooks {
        id
        name
        posterURL
        rate
      }
    }
  }
`;

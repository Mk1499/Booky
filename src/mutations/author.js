import {gql} from '@apollo/client';

export const addAuthorToFavMutation = gql`
  mutation($userID: String!, $authorID: String!) {
    addFavAuthor(userID: $userID, authorID: $authorID) {
      id
    }
  }
`;

export const removeAuthorToFavMutation = gql`
  mutation($userID: ID!, $authorID: ID!) {
    removeAuthorFav(userID: $userID, authorID: $authorID) {
      id
    }
  }
`;

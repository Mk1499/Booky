import {gql} from '@apollo/client';

export const addAuthorToFavMutation = gql`
  mutation($userID: String!, $authorID: String!) {
    addFavAuthor(userID: $userID, authorID: $authorID) {
      id
    }
  }
`;

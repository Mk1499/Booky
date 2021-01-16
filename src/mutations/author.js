import {gql} from '@apollo/client';

export const addAuthorToFavMutation = gql`
  mutation($userID: String!, $authorID: String!) {
    addFavAuthor(userID: $userID, authorID: $authorID) {
      id
    }
  }
`;

export const removeAuthorToFavMutation = gql`
  mutation($id: ID!) {
    removeAuthorFav(id: $id) {
      id
    }
  }
`;

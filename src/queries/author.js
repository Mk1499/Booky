import {gql} from '@apollo/client';

export const checkAuthorFavQuery = gql`
  query($userID: String!, $authorID: String!) {
    checkAuthorFav(userID: $userID, authorID: $authorID) {
      id
    }
  }
`;

export const getFavAuthorsQuery = gql`
  query($userID: String!) {
    favAuthors(userID: $userID) {
      id
      author {
        id
        name
        avatarURL
      }
    }
  }
`;

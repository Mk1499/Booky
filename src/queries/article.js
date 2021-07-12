import {gql} from '@apollo/client';

export const getUserArticlesQuery = gql`
  query($userID: String!, $page: Int) {
    userAddedArticles(userID: $userID, page: $page) {
      allArticlesNum
      articles {
        id
        title
        enTitle
        coverURL
        body
        publisher {
          id
          name
          photo
        }
      }
    }
  }
`;

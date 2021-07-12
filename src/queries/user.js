import {gql} from '@apollo/client';

export const getUserAddedBooksQuery = gql`
  query($userID: String!, $page:Int) {
    userAddedBooks(userID: $userID,page:$page ) {
      allBooksNum
      books{
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

export const getUserProfileQ = gql`
  query($userID: ID!) {
    user(id: $userID) {
      id
      name
      photo
      cover
      followers
      following
      addedBooksNum
      quote
      addedBooks{
        id
        name
        enName
        posterURL
      }
      articlesNum
      articles{
        id
        title
        coverURL
        body
        publisher{
          name
          photo
        }
      }
    }
  }
`

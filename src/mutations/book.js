import {gql} from '@apollo/client';

export const addBookToFavMutation = gql`
  mutation($userID: String!, $bookID: String!) {
    addBookFav(userID: $userID, bookID: $bookID) {
      id
    }
  }
`;

export const removeBookFromFavMutation = gql`
  mutation($userID: ID!, $bookID: ID!) {
    removeBookFav(userID: $userID, bookID: $bookID) {
      id
    }
  }
`;

export const addBookReadMutation = gql`
  mutation($userID: String!, $bookID: String!, $lastPage: Int!) {
    addBookRead(userID: $userID, bookID: $bookID, lastPage: $lastPage) {
      id
      user {
        id
        name
      }
      book {
        id
        name
      }
      lastPage
      time
    }
  }
`;

export const addBook = gql`
  mutation(
    $userID: ID!
    $authorID: ID!
    $name: String!
    $description: String!
    $readURL: String!
    $genreID: String!
    $coverURL: String!
    $enName: String!
  ) {
    addBook(
      name: $name
      enName: $enName
      authorID: $authorID
      ownerID: $userID
      description: $description
      readURL: $readURL
      genreID: $genreID
      posterURL: $coverURL
    ) {
      id
      name
    }
  }
`;
export const addCommentAction = gql`
  mutation($userID: String!, $commentID: String!, $action: String!) {
    addCommentAction(userID: $userID, commentID: $commentID, action: $action) {
      id
    }
  }
`;

export const addBookCommentMutation = gql`
  mutation($userID:String!,$bookID:String!,$comment:String!){
    addBookComment(userID:$userID,comment:$comment, bookID:$bookID){
      id
    }
  }
`
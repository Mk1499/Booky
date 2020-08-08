import {gql} from '@apollo/client';

export const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
      avatarURL
    }
  }
`;

export const getBooksQuery = gql`
  query {
    books(limit: 5) {
      id
      name
      genre {
        name
      }
      posterURL
      author {
        name
      }
    }
  }
`;

export const getGenresQuery = gql`
  query {
    genres {
      id
      name
      photoURL
    }
  }
`;

export const getLatestBooksQuery = gql`
  query {
    books(limit: -5) {
      id
      name
      genre {
        name
      }
      posterURL
      author {
        name
      }
    }
  }
`;

export const getBookDetails = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      posterURL
      rate
      description
      author {
        id
        name
      }
      genre {
        id
        name
      }
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorID: ID!) {
    addBook(name: $name, genre: $genre, authorID: $authorID) {
      name
      id
    }
  }
`;

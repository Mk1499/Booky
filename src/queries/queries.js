import {gql} from '@apollo/client';

// User
export const getUserDetailsQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      password
      email
      photo
      reads {
        id
        time
      }
      addedBooks {
        id
        name
        posterURL
        rate
      }
    }
  }
`;

export const userLogin = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
      photo
    }
  }
`;

export const userLogout = gql`
  mutation($id: ID!) {
    logoutUser(id: $id) {
      name
    }
  }
`;

export const updateUserImgMutation = gql`
  mutation($id: ID!, $photoURL: String!) {
    updateUserImage(id: $id, photoURL: $photoURL) {
      id
      name
      email
      photo
    }
  }
`;

export const addUser = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    addUser(email: $email, password: $password, name: $name, type: "normal") {
      id
      name
      email
    }
  }
`;

// Author
export const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
      avatarURL
    }
  }
`;

export const getAuthorDetails = gql`
  query($id: ID!) {
    author(id: $id) {
      id
      name
      birthDate
      avatarURL
      age
      bio
      books {
        name
        id
        posterURL
        rate
      }
    }
  }
`;

// Book
export const getBooksQuery = gql`
  query {
    books(limit: 5) {
      id
      name
      genre {
        name
      }
      posterURL
      readURL
      author {
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

export const getLatestBooksQuery = gql`
  query {
    books(limit: -5) {
      id
      name
      rate
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
      readURL
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
      relatedBooks {
        id
        name
        posterURL
        rate
      }
      reads {
        id
        time
      }
    }
  }
`;

// Genres
export const getGenresQuery = gql`
  query {
    genres {
      id
      name
      photoURL
    }
  }
`;
export const getGenreDetails = gql`
  query($id: ID!) {
    genre(id: $id) {
      name
      photoURL
      books {
        name
        id
        posterURL
        rate
        author {
          name
        }
      }
    }
  }
`;

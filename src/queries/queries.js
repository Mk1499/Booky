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
        enName
        posterURL
        rate
      }
    }
  }
`;

export const userLogin = gql`
  mutation($email: String!, $password: String!, $deviceToken: String) {
    loginUser(email: $email, password: $password, deviceToken: $deviceToken) {
      id
      name
      email
      photo
      quote
      cover
      favBooks {
        book {
          id
        }
      }
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
      enName
      avatarURL
    }
  }
`;

export const getAuthorDetails = gql`
  query($id: ID!) {
    author(id: $id) {
      id
      name
      enName
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
      enName
      genre {
        name
        enName
      }
      posterURL
      readURL
      author {
        name
        enName
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
      enName
      rate
      genre {
        name
        enName
      }
      posterURL
      author {
        name
        enName
      }
    }
  }
`;

export const getBookDetails = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      enName
      posterURL
      readURL
      rate
      description
      author {
        id
        name
        enName
      }
      genre {
        id
        name
        enName
      }
      relatedBooks {
        id
        name
        enName
        posterURL
        rate
      }
      reads {
        id
        time
      }
      owner {
        id
        name
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
      enName
      photoURL
    }
  }
`;
export const getGenreDetails = gql`
  query($id: ID!) {
    genre(id: $id) {
      name
      photoURL
      enName
      books {
        name
        enName
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

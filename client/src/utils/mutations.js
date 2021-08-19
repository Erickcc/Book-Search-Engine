import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($book: bookInput!) {
    saveBook(book: $book) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookdId: String!) {
    removeBook(bookdId: $bookId) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
  }
`;
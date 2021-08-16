const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input bookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }


  type Query {
    getSingleUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(_id: ID!, book: bookInput): User
    deleteBook(_id: ID!, bookId: String!): User
  }

`;

module.exports = typeDefs;

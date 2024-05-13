// schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  },

  type Company{
    id:ID!
    name:String!
    role:String!
    location:String!
  },

  type Query {
    users: [User!]!
    user(id: ID!): User
    companies: [Company]!
  }

  type Mutation {
    createUser(name:String!,email:String!):User!
    updateUser(id:ID!,name:String!,email:String!):User!
    deleteUser(id:ID!):User!
    createcompany(name:String!,role:String!,location:String!):Company!
  }
`;

module.exports = typeDefs;

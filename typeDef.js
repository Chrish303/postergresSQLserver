const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    address: String!
    city: String!
    district: String!
    state: String!
    pincode: String!
  }

  type Company {
    id: ID!
    name: String!
    role: String!
    location: String!
    opening:Int!
    experience:String!
    skill:String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    companies: [Company]!
    company(id: ID!): Company
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int!, address: String!, city: String!, district: String!, state: String!, pincode: String!): User!
    updateUser(id: ID!, name: String!, email: String!, age: Int!, address: String!, city: String!, district: String!, state: String!, pincode: String!): User!
    deleteUser(id: ID!): User!
    createCompany(name: String!, role: String!, location: String!,  opening:Int!,  experience:String!, skill:String!): Company!
    updateCompany(id: ID!,name: String!, role: String!, location: String!,  opening:Int!,  experience:String!,skill:String!): Company!
    deleteCompany(id: ID!): Company!
  }
`;

module.exports = typeDefs;

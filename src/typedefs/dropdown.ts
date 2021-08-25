import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Dropdown {
    id: ID!
    name: String!
  }  

  enum Type {
    artist
    genre
  }

  extend type Query {
    dropdown(type: Type!): [Dropdown!]!
  }
`;

export default typeDefs;
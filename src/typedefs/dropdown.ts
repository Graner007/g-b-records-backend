import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Dropdown {
    id: ID!
    name: String!
  }  

  extend type Query {
    dropdown(type: String!): [Dropdown!]!
  }
`;

export default typeDefs;
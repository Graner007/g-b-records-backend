import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Artist {
    id: ID!
    name: String!
    records: [Record!]!
  }

  extend type Query {
    artists: [Artist!]!
  }
`;

export default typeDefs;
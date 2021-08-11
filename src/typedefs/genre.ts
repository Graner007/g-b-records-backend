import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String!
    records: [Record!]!
  }

  extend type Query {
    genres: [Genre!]!
  }
`;

export default typeDefs;
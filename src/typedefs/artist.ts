import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Artist {
    id: ID!
    name: String!
    records: [Record!]!
  }
`;

export default typeDefs;
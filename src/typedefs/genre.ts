import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String!
    records: [Record!]!
  }
`;

export default typeDefs;
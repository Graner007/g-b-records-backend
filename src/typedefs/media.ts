import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Media {
    id: ID!
    name: String!
    linkUrl: String!
  }

  extend type Query {
    imageSlider: [Media!]!
    decade: [Media!]!
  }
`;

export default typeDefs;
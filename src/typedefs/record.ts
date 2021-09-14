import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime 

  type Record {
    id: ID!
    name: String!
    description: String!
    releaseDate: DateTime!
    albumCover: String!
    price: Int!
    leftInStock: Int!
    artist: Artist!
    genres: [Genre!]!
    wishlist: [Wishlist!]!
    isInWishlist: Boolean
  }

  type Category {
    records: [Record!]!
    count: Int!
    minPrice: Int!
    maxPrice: Int!
  }

  input RecordOrderByInput {
    releaseDate: Sort
    price: Sort
    name: Sort
  }

  enum Sort {
      asc
      desc
  }

  extend type Query {
    records: [Record!]!
    record(recordId: Int!): Record!
    recordByName(recordName: String!): Record!
    category(filter: String, skip: Int, take: Int, orderBy: RecordOrderByInput, min: Int, max: Int): Category!
    recordsBetweenTwoPrice(min: Int!, max: Int!): [Record!]!
    recommendedRecords: [Record!]!
    searchRecords(searchPhrase: String!): [Record!]!
  }
`;

export default typeDefs;
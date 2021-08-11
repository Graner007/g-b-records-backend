import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Wishlist {
    id: ID!
    products: [Record!]!
  }

  extend type Query {
    wishlists: [Wishlist!]!
    wishlist: Wishlist!
  }

  extend type Mutation {
    toggleProductInWhislist(recordId: Int!): Wishlist!
  }
`;

export default typeDefs;
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

  type ProductWishlist {
    wishlist: Wishlist!
    operationType: String!
  }

  extend type Mutation {
    toggleProductInWhislist(recordId: Int!): ProductWishlist!
    addAllProductsToCart: Cart!
    deleteWishlistItem(recordId: Int!): Record!
  }
`;

export default typeDefs;
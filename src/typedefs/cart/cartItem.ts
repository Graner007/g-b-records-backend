import { gql } from "apollo-server-express";

const typeDefs = gql`
  type CartItem {
    id: ID!
    name: String!
    albumCover: String!
    oneUnitPrice: Int!
    price: Int!
    quantity: Int!
  }

  extend type Query {
    cartItems: [CartItem!]!
  }

  extend type Mutation {
    deleteCartItem(cartItemId: Int!): CartItem!
    updateCartItemQuantity(recordId: Int!, cartItemId: Int!, cartItemQuantity: Int!): CartItem!
    addCartItem(recordId: Int!): CartItem!
    deleteAllCartItemForUser: Cart!
  }

  extend type Subscription {
    newCartItem: CartItem
  }
`;

export default typeDefs;
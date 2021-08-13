import { gql } from "apollo-server-express";

const typeDefs = gql`
  type CartItem {
    id: ID!
    name: String!
    albumCover: String!
    price: Int!
    quantity: Int!
  }

  extend type Query {
    cartItems: [CartItem!]!
  }

  extend type Mutation {
    deleteCartItem(cartItemId: Int!): CartItem!
    updateCartItemQuantity(cartItemId: Int!, cartItemQuantity: Int!): CartItem!
    addCartItem(name: String!, albumCover: String!, price: Int!): CartItem!
    deleteAllCartItemForUser: Cart!
  }

  extend type Subscription {
    newCartItem: CartItem
  }
`;

export default typeDefs;
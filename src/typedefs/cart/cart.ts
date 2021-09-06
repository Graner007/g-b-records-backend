import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Cart {
    id: ID!
    products: [CartItem!]!
  }
  type UserCart {
    cart: Cart!
    grandTotal: Int!
  }
  extend type Query {
    carts: [Cart!]!
    cart: UserCart!
  }
`;

export default typeDefs;
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Cart {
    id: ID!
    products: [CartItem!]!
  }

  extend type Query {
    carts: [Cart!]!
    cart: Cart!
  }
`;

export default typeDefs;
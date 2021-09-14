import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Cart {
    id: ID!
    grandTotal: Int!
    products: [CartItem!]!
  }
  
  extend type Query {
    cart: Cart!
  }
`;

export default typeDefs;
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type OrderItem {
    id: ID!
    name: String!
    albumCover: String!
    price: Int!
    quantity: Int!
  }

  extend type Query {
    orderItems: [OrderItem!]!
  }

  extend type Mutation {
    payment: Order!
  }
`;

export default typeDefs;
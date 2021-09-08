import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Order {
    id: ID!
    orderDate: DateTime!
    address: String!
    products: [OrderItem!]!
    payment: Int!
    productNumber: Int!
    user: User!
  }

  type CreatePaymentSession {
    url: String!
  }

  extend type Query {
    orders: [Order!]!
    order(orderId: Int!): Order!
    createPaymentSession: CreatePaymentSession!
  }
`;

export default typeDefs;
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

  type CheckoutSession {
    id: String!
    customerEmail: String
    paymentSuccess: Boolean!
  }

  extend type Query {
    orders: [Order!]!
    order(orderId: Int!): Order!
    createPaymentSession: CreatePaymentSession!
    checkoutSession(checkoutSessionId: String!): CheckoutSession!
  }
`;

export default typeDefs;
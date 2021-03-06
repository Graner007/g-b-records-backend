import { gql } from "apollo-server-express";

const typeDefs = gql`
  type CheckoutDetail {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String!
    zipcode: Int!
    telephone: String!
    country: String!
  }

  extend type Mutation {
    addCheckoutDetail(
      firstName: String!
      lastName: String!
      address: String!
      email: String!
      zipcode: Int!
      country: String!
      telephone: String!
    ): CheckoutDetail!
  }
`;

export default typeDefs;
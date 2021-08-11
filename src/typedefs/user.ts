import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        signUpDate: DateTime
        address: String!
        zipcode: Int!
        telephone: String!
        country: String!
        orders: [Order]
        cart: Cart!
        wishlist: Wishlist!
    }

    type AuthPayload {
        token: String
        user: User
    }

    extend type Query {
        users: [User!]!
        user: User!
    }

    extend type Mutation {
        signup(email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }
`;

export default typeDefs;
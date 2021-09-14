import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        signUpDate: DateTime
        address: String!
        zipcode: Int!
        telephone: String!
        country: String!
        searchRecords: [SearchRecord]
        orders: [Order]
        cart: Cart!
        wishlist: Wishlist!
    }

    type AuthPayload {
        token: String
        user: User
    }

    extend type Query {
        user: User!
        loggedIn: Boolean!
    }

    extend type Mutation {
        signup(email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        editUserDetails(firstName: String, lastName: String, address: String, zipcode: Int, telephone: String, country: String): User!
    }
`;

export default typeDefs;
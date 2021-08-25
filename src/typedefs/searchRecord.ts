import { gql } from "apollo-server-express";

const typeDefs = gql`
    type SearchRecord {
        id: ID!
        name: String!
    }
`;

export default typeDefs;
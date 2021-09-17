import { ApolloServer } from 'apollo-server-express';

import typeDefs from "../typedefs/index";
import resolvers from "../resolvers/index";
import { context } from '../context';

export const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        return context(req);
    }
});
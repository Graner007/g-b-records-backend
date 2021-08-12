import { ApolloServer } from "apollo-server-express";
import express from "express";

import typeDefs from "./typedefs/index";
import resolvers from "./resolvers/index";
import { context } from './context';

const PORT = process.env.PORT || 4000;

const startApolloServer = async () => {
    const server = new ApolloServer({ 
        typeDefs,
        resolvers,
        context: ({ req }) => {
            return context(req);
        },
        introspection: true
    });
    await server.start();
    const app = express();
    server.applyMiddleware({ app });
    await new Promise(() => app.listen({ port: PORT }));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
import { PrismaClient } from '@prisma/client';
import { PubSub } from "graphql-subscriptions";
import { getUserId } from "./utils";
import { Request } from "express";

export interface Context {
    prisma: PrismaClient;
    pubsub: PubSub;
    userId: any;
}

const prisma = new PrismaClient();
const pubsub = new PubSub();

export const context = (req: Request):Context => {
    return {
        ...req,
        prisma,
        pubsub,
        userId: 
            req && req.headers.authorization ? getUserId(req) : null
    }
}
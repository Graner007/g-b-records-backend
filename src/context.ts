import { PrismaClient } from '@prisma/client';
import { PubSub } from "graphql-subscriptions";
import { getUserId } from "./utils";
import { Request } from "express";
import Stripe from 'stripe';

export interface Context {
    prisma: PrismaClient;
    pubsub: PubSub;
    stripe: Stripe;
    userId: any;
}

const prisma = new PrismaClient();
const pubsub = new PubSub();
const stripe = new Stripe('sk_test_51JNfg5AauhwgYpNeMU4405spAwZBMvDwItI1GApAVYMeLoCGJo0Dpmahw5GjBNfcuzEJlOOMc9EiZVOJKbJSw2Fr00RlhlWq2k', {
    apiVersion: '2020-08-27',
});

export const context = (req: Request):Context => {
    return {
        ...req,
        prisma,
        pubsub,
        stripe,
        userId: 
            req && req.headers.authorization ? getUserId(req) : null
    }
}
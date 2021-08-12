"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
var client_1 = require("@prisma/client");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var utils_1 = require("./utils");
var stripe_1 = __importDefault(require("stripe"));
var prisma = new client_1.PrismaClient();
var pubsub = new graphql_subscriptions_1.PubSub();
var stripe = new stripe_1.default('sk_test_51JNfg5AauhwgYpNeMU4405spAwZBMvDwItI1GApAVYMeLoCGJo0Dpmahw5GjBNfcuzEJlOOMc9EiZVOJKbJSw2Fr00RlhlWq2k', {
    apiVersion: '2020-08-27',
});
var context = function (req) {
    return __assign(__assign({}, req), { prisma: prisma, pubsub: pubsub, stripe: stripe, userId: req && req.headers.authorization ? utils_1.getUserId(req) : null });
};
exports.context = context;

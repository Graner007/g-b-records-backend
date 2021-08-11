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
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
var client_1 = require("@prisma/client");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var utils_1 = require("./utils");
var prisma = new client_1.PrismaClient();
var pubsub = new graphql_subscriptions_1.PubSub();
var context = function (req) {
    return __assign(__assign({}, req), { prisma: prisma, pubsub: pubsub, userId: req && req.headers.authorization ? utils_1.getUserId(req) : null });
};
exports.context = context;

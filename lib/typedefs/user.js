"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type User {\n        id: ID!\n        name: String!\n        email: String!\n        password: String!\n        signUpDate: DateTime\n        address: String!\n        zipcode: Int!\n        telephone: String!\n        country: String!\n        orders: [Order]\n        cart: Cart!\n        wishlist: Wishlist!\n    }\n\n    type AuthPayload {\n        token: String\n        user: User\n    }\n\n    extend type Query {\n        users: [User!]!\n        user: User!\n    }\n\n    extend type Mutation {\n        signup(email: String!, password: String!): AuthPayload\n        login(email: String!, password: String!): AuthPayload\n    }\n"], ["\n    type User {\n        id: ID!\n        name: String!\n        email: String!\n        password: String!\n        signUpDate: DateTime\n        address: String!\n        zipcode: Int!\n        telephone: String!\n        country: String!\n        orders: [Order]\n        cart: Cart!\n        wishlist: Wishlist!\n    }\n\n    type AuthPayload {\n        token: String\n        user: User\n    }\n\n    extend type Query {\n        users: [User!]!\n        user: User!\n    }\n\n    extend type Mutation {\n        signup(email: String!, password: String!): AuthPayload\n        login(email: String!, password: String!): AuthPayload\n    }\n"])));
exports.default = typeDefs;
var templateObject_1;

"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Order {\n    id: ID!\n    orderDate: DateTime!\n    address: String!\n    products: [OrderItem!]!\n    payment: Int!\n    productNumber: Int!\n    user: User!\n  }\n\n  extend type Query {\n    orders: [Order!]!\n    order(orderId: Int!): Order!\n    createPaymentSession: String!\n  }\n"], ["\n  type Order {\n    id: ID!\n    orderDate: DateTime!\n    address: String!\n    products: [OrderItem!]!\n    payment: Int!\n    productNumber: Int!\n    user: User!\n  }\n\n  extend type Query {\n    orders: [Order!]!\n    order(orderId: Int!): Order!\n    createPaymentSession: String!\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;

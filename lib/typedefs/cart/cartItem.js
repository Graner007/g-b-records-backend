"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type CartItem {\n    id: ID!\n    name: String!\n    albumCover: String!\n    oneUnitPrice: Int!\n    price: Int!\n    leftInStock: Int!\n    quantity: Int!\n  }\n\n  extend type Mutation {\n    deleteCartItem(cartItemId: Int!): CartItem!\n    updateCartItemQuantity(cartItemId: Int!, cartItemQuantity: Int!): CartItem!\n    addCartItem(recordId: Int!): CartItem!\n    deleteAllCartItemForUser: Cart!\n  }\n\n  extend type Subscription {\n    newCartItem: CartItem\n  }\n"], ["\n  type CartItem {\n    id: ID!\n    name: String!\n    albumCover: String!\n    oneUnitPrice: Int!\n    price: Int!\n    leftInStock: Int!\n    quantity: Int!\n  }\n\n  extend type Mutation {\n    deleteCartItem(cartItemId: Int!): CartItem!\n    updateCartItemQuantity(cartItemId: Int!, cartItemQuantity: Int!): CartItem!\n    addCartItem(recordId: Int!): CartItem!\n    deleteAllCartItemForUser: Cart!\n  }\n\n  extend type Subscription {\n    newCartItem: CartItem\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;

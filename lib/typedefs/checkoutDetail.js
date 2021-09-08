"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type CheckoutDetail {\n    id: ID!\n    firstName: String!\n    lastName: String!\n    email: String!\n    address: String!\n    zipcode: Int!\n    telephone: String!\n    country: String!\n  }\n\n  extend type Mutation {\n    addCheckoutDetail(\n      firstName: String!\n      lastName: String!\n      address: String!\n      email: String!\n      zipcode: Int!\n      country: String!\n      telephone: String!\n    ): CheckoutDetail!\n  }\n"], ["\n  type CheckoutDetail {\n    id: ID!\n    firstName: String!\n    lastName: String!\n    email: String!\n    address: String!\n    zipcode: Int!\n    telephone: String!\n    country: String!\n  }\n\n  extend type Mutation {\n    addCheckoutDetail(\n      firstName: String!\n      lastName: String!\n      address: String!\n      email: String!\n      zipcode: Int!\n      country: String!\n      telephone: String!\n    ): CheckoutDetail!\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;

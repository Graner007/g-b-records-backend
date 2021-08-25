"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Dropdown {\n    id: ID!\n    name: String!\n  }  \n\n  enum Type {\n    artist\n    genre\n  }\n\n  extend type Query {\n    dropdown(type: Type!): [Dropdown!]!\n  }\n"], ["\n  type Dropdown {\n    id: ID!\n    name: String!\n  }  \n\n  enum Type {\n    artist\n    genre\n  }\n\n  extend type Query {\n    dropdown(type: Type!): [Dropdown!]!\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;

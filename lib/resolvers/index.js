"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var records_1 = __importDefault(require("./record/records"));
var users_1 = __importDefault(require("./user/users"));
var orders_1 = __importDefault(require("./order/orders"));
var orderItems_1 = __importDefault(require("./order/orderItems"));
var carts_1 = __importDefault(require("./cart/carts"));
var cartItems_1 = __importDefault(require("./cart/cartItems"));
var wishlists_1 = __importDefault(require("./wishlists"));
var dropdowns_1 = __importDefault(require("./dropdowns"));
var checkoutDetails_1 = __importDefault(require("./checkoutDetails"));
var medias_1 = __importDefault(require("./medias"));
exports.default = [records_1.default, users_1.default, orders_1.default, orderItems_1.default, carts_1.default, cartItems_1.default, wishlists_1.default, dropdowns_1.default, checkoutDetails_1.default, medias_1.default];

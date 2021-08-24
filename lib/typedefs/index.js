"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var record_1 = __importDefault(require("./record"));
var artist_1 = __importDefault(require("./artist"));
var genre_1 = __importDefault(require("./genre"));
var user_1 = __importDefault(require("./user"));
var order_1 = __importDefault(require("./order/order"));
var orderItem_1 = __importDefault(require("./order/orderItem"));
var cart_1 = __importDefault(require("./cart/cart"));
var cartItem_1 = __importDefault(require("./cart/cartItem"));
var wishlist_1 = __importDefault(require("./wishlist"));
var media_1 = __importDefault(require("./media"));
var dropdown_1 = __importDefault(require("./dropdown"));
var default_1 = __importDefault(require("./default"));
exports.default = [default_1.default, record_1.default, artist_1.default, genre_1.default, user_1.default, order_1.default, orderItem_1.default, cart_1.default, cartItem_1.default, wishlist_1.default, dropdown_1.default, media_1.default];

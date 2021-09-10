"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cartItemUtils_1 = require("./cartItemUtils");
var userUtils_1 = require("../user/userUtils");
var recordUtils_1 = require("../record/recordUtils");
var resolvers = {
    Query: {
        cartItems: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, context.prisma.cartItem.findMany()];
            });
        }); }
    },
    Mutation: {
        deleteCartItem: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, cartItem;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, userUtils_1.user(context)];
                    case 1:
                        currentUser = _b.sent();
                        cartItem = (_a = currentUser.cart) === null || _a === void 0 ? void 0 : _a.products.find(function (product) { return product.id === args.cartItemId; });
                        if (cartItem) {
                            return [2, cartItemUtils_1.deleteCartItem({ cartItemId: args.cartItemId }, context)];
                        }
                        else {
                            throw new Error("CartItem can not be deleted");
                        }
                        return [2];
                }
            });
        }); },
        updateCartItemQuantity: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, record, cartItem;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, userUtils_1.user(context)];
                    case 1:
                        currentUser = _b.sent();
                        return [4, recordUtils_1.getRecordById({ recordId: args.recordId }, context)];
                    case 2:
                        record = _b.sent();
                        cartItem = (_a = currentUser.cart) === null || _a === void 0 ? void 0 : _a.products.find(function (product) { return product.id === args.cartItemId; });
                        if (cartItem) {
                            if (args.cartItemQuantity === 0) {
                                return [2, cartItemUtils_1.deleteCartItem({ cartItemId: args.cartItemId }, context)];
                            }
                            if (args.cartItemQuantity <= record.leftInStock) {
                                return [2, context.prisma.cartItem.update({
                                        where: {
                                            id: args.cartItemId
                                        },
                                        data: {
                                            quantity: args.cartItemQuantity,
                                            price: args.cartItemQuantity * cartItem.oneUnitPrice
                                        }
                                    })];
                            }
                            else {
                                throw new Error("No more Record in stock");
                            }
                        }
                        else {
                            throw new Error("CartItem can not be updated");
                        }
                        return [2];
                }
            });
        }); },
        addCartItem: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, record, cartItem;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, userUtils_1.user(context)];
                    case 1:
                        currentUser = _b.sent();
                        return [4, recordUtils_1.getRecordById({ recordId: args.recordId }, context)];
                    case 2:
                        record = _b.sent();
                        if (currentUser.cart && record) {
                            cartItem = (_a = currentUser.cart) === null || _a === void 0 ? void 0 : _a.products.find(function (product) {
                                return product.name === record.name &&
                                    product.albumCover === record.albumCover &&
                                    product.oneUnitPrice === record.price &&
                                    product.quantity > 0;
                            });
                            if (cartItem && cartItem.quantity < record.leftInStock) {
                                return [2, cartItemUtils_1.incrementCartItemQuantity({ cartItemId: cartItem.id, ontUnitprice: cartItem.oneUnitPrice }, context)];
                            }
                            else if (cartItem && cartItem.quantity >= record.leftInStock) {
                                throw new Error("No more Record in stock");
                            }
                            else {
                                return [2, cartItemUtils_1.addCartItem({
                                        name: record.name,
                                        albumCover: record.albumCover,
                                        price: record.price,
                                        cartId: currentUser.cart.id
                                    }, context)];
                            }
                        }
                        return [2];
                }
            });
        }); },
        deleteAllCartItemForUser: cartItemUtils_1.deleteAllCartItemForUser
    },
    Subscription: {
        newCartItem: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                subscribe: (function () { return context.pubsub.asyncIterator("NEW_CART_ITEM"); });
                return [2];
            });
        }); }
    }
};
exports.default = resolvers;

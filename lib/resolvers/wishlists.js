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
var userUtils_1 = require("./user/userUtils");
var cartUtils_1 = require("./cart/cartUtils");
var resolvers = {
    Query: {
        wishlist: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (context.userId !== null) {
                    return [2, context.prisma.wishlist.findUnique({
                            where: {
                                userId: context.userId
                            },
                            include: {
                                products: {
                                    include: {
                                        artist: true
                                    },
                                    take: args.take,
                                    skip: args.skip
                                }
                            }
                        })];
                }
                throw new Error("Please Login");
            });
        }); }
    },
    Mutation: {
        toggleProductInWhislist: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, record, wishlist, operationType, wishlist, operationType;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, userUtils_1.user(context)];
                    case 1:
                        currentUser = _d.sent();
                        record = (_a = currentUser.wishlist) === null || _a === void 0 ? void 0 : _a.products.find(function (product) { return product.id === args.recordId; });
                        if (!!record) return [3, 3];
                        return [4, context.prisma.wishlist.update({
                                where: {
                                    id: (_b = currentUser.wishlist) === null || _b === void 0 ? void 0 : _b.id
                                },
                                select: {
                                    products: true
                                },
                                data: {
                                    products: {
                                        connect: {
                                            id: args.recordId
                                        }
                                    }
                                }
                            })];
                    case 2:
                        wishlist = _d.sent();
                        operationType = "add";
                        return [2, { wishlist: wishlist, operationType: operationType }];
                    case 3: return [4, context.prisma.wishlist.update({
                            where: {
                                id: (_c = currentUser.wishlist) === null || _c === void 0 ? void 0 : _c.id
                            },
                            include: {
                                products: true
                            },
                            data: {
                                products: {
                                    disconnect: {
                                        id: args.recordId
                                    }
                                }
                            }
                        })];
                    case 4:
                        wishlist = _d.sent();
                        operationType = "remove";
                        return [2, { wishlist: wishlist, operationType: operationType }];
                }
            });
        }); },
        addAllProductsToCart: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, userCart;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, userUtils_1.user(context)];
                    case 1:
                        currentUser = _c.sent();
                        if (!(((_a = currentUser.wishlist) === null || _a === void 0 ? void 0 : _a.products) !== [])) return [3, 3];
                        (_b = currentUser.wishlist) === null || _b === void 0 ? void 0 : _b.products.forEach(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                            var cartItem;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        cartItem = (_a = currentUser.cart) === null || _a === void 0 ? void 0 : _a.products.find(function (record) {
                                            return product.name === record.name &&
                                                product.albumCover === record.albumCover &&
                                                product.price === record.oneUnitPrice &&
                                                record.quantity > 0;
                                        });
                                        if (!cartItem) return [3, 2];
                                        return [4, context.prisma.cartItem.update({
                                                where: {
                                                    id: cartItem.id
                                                },
                                                data: {
                                                    quantity: {
                                                        increment: 1
                                                    },
                                                    price: {
                                                        increment: cartItem.oneUnitPrice
                                                    }
                                                }
                                            })];
                                    case 1:
                                        _c.sent();
                                        return [3, 4];
                                    case 2: return [4, context.prisma.cartItem.create({
                                            data: {
                                                name: product.name,
                                                albumCover: product.albumCover,
                                                price: product.price,
                                                oneUnitPrice: product.price,
                                                leftInStock: product.leftInStock,
                                                quantity: 1,
                                                cart: {
                                                    connect: {
                                                        id: (_b = currentUser.cart) === null || _b === void 0 ? void 0 : _b.id
                                                    }
                                                }
                                            }
                                        })];
                                    case 3:
                                        _c.sent();
                                        _c.label = 4;
                                    case 4: return [2];
                                }
                            });
                        }); });
                        return [4, cartUtils_1.cart(context)];
                    case 2:
                        userCart = _c.sent();
                        return [2, userCart];
                    case 3: throw new Error("Wishlist is empty");
                }
            });
        }); },
        deleteWishlistItem: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, record;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, userUtils_1.user(context)];
                    case 1:
                        currentUser = _c.sent();
                        record = (_a = currentUser.wishlist) === null || _a === void 0 ? void 0 : _a.products.find(function (product) { return product.id === args.recordId; });
                        if (!record) return [3, 3];
                        return [4, context.prisma.wishlist.update({
                                where: {
                                    id: (_b = currentUser.wishlist) === null || _b === void 0 ? void 0 : _b.id
                                },
                                include: {
                                    products: {
                                        include: {
                                            artist: true
                                        }
                                    }
                                },
                                data: {
                                    products: {
                                        disconnect: {
                                            id: args.recordId
                                        }
                                    }
                                }
                            })];
                    case 2:
                        _c.sent();
                        return [2, record];
                    case 3: throw new Error("Record can not be deleted from wishlist");
                }
            });
        }); }
    }
};
exports.default = resolvers;

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
var cartItemUtils_1 = require("../cart/cartItemUtils");
var userUtils_1 = require("../user/userUtils");
var orderItemUtils_1 = require("./orderItemUtils");
var orderUtils_1 = require("./orderUtils");
var resolvers = {
    Mutation: {
        successfulPayment: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var currentUser, payment_1, productNumber_1, checkoutDetail, newOrder_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, userUtils_1.user(context)];
                    case 1:
                        currentUser = _a.sent();
                        if (!(currentUser.cart && currentUser.cart.products.length > 0)) return [3, 5];
                        payment_1 = 0;
                        productNumber_1 = 0;
                        currentUser.cart.products.forEach(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        payment_1 += product.price * product.quantity;
                                        productNumber_1++;
                                        return [4, context.prisma.record.update({
                                                where: {
                                                    name: product.name
                                                },
                                                data: {
                                                    leftInStock: {
                                                        decrement: product.quantity
                                                    }
                                                }
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); });
                        return [4, context.prisma.checkoutDetail.findMany({
                                where: {
                                    userId: currentUser.id
                                },
                                orderBy: {
                                    id: "desc"
                                },
                                take: 1
                            })];
                    case 2:
                        checkoutDetail = _a.sent();
                        return [4, orderUtils_1.addOrder({
                                address: checkoutDetail[0].address,
                                payment: payment_1,
                                productNumber: productNumber_1
                            }, context)];
                    case 3:
                        newOrder_1 = _a.sent();
                        currentUser.cart.products.map(function (product) {
                            orderItemUtils_1.addOrderItem({
                                name: product.name,
                                albumCover: product.albumCover,
                                price: product.price,
                                quantity: product.quantity,
                                orderId: newOrder_1.id
                            }, context);
                        });
                        return [4, cartItemUtils_1.deleteAllCartItemForUser(context)];
                    case 4:
                        _a.sent();
                        return [2, orderUtils_1.order({ orderId: newOrder_1.id }, context)];
                    case 5: throw new Error("Cart is empty");
                }
            });
        }); }
    }
};
exports.default = resolvers;

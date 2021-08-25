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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var utils_1 = require("../../utils");
var resolvers = {
    Query: {
        users: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, context.prisma.user.findMany({
                        include: {
                            cart: true,
                            orders: true,
                            wishlist: true
                        }
                    })];
            });
        }); },
        user: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                userId = context.userId.userId;
                return [2, context.prisma.user.findUnique({
                        where: {
                            id: userId
                        },
                        include: {
                            cart: {
                                include: {
                                    products: true
                                }
                            },
                            orders: {
                                include: {
                                    products: true
                                }
                            },
                            wishlist: {
                                include: {
                                    products: true
                                }
                            }
                        },
                        rejectOnNotFound: function () {
                            throw new Error("User, Cart, Order or Wishlist not found!");
                        }
                    })];
            });
        }); }
    },
    Mutation: {
        signup: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var userIsExists, password, user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, context.prisma.user.findUnique({ where: { email: args.email } })];
                    case 1:
                        userIsExists = _a.sent();
                        if (userIsExists) {
                            throw new Error('User already created!');
                        }
                        return [4, bcrypt_1.default.hash(args.password, 10)];
                    case 2:
                        password = _a.sent();
                        return [4, context.prisma.user.create({
                                data: {
                                    email: args.email,
                                    password: password,
                                    cart: {
                                        create: {}
                                    },
                                    wishlist: {
                                        create: {}
                                    }
                                }
                            })];
                    case 3:
                        user = _a.sent();
                        token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
                        return [2, { token: token, user: user }];
                }
            });
        }); },
        login: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var user, valid, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, context.prisma.user.findUnique({ where: { email: args.email } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('No such user found');
                        }
                        return [4, bcrypt_1.default.compare(args.password, user.password)];
                    case 2:
                        valid = _a.sent();
                        if (!valid) {
                            throw new Error('Invalid password');
                        }
                        token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
                        return [2, { token: token, user: user }];
                }
            });
        }); },
        editUserDetails: function (_parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var userId, editedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = context.userId.userId;
                        return [4, context.prisma.user.update({
                                where: {
                                    id: userId
                                },
                                data: {
                                    firstName: args.firstName,
                                    lastName: args.lastName,
                                    address: args.address,
                                    telephone: args.telephone,
                                    zipcode: args.zipcode,
                                    country: args.country
                                }
                            })];
                    case 1:
                        editedUser = _a.sent();
                        return [2, editedUser];
                }
            });
        }); }
    }
};
exports.default = resolvers;

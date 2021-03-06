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
exports.getRecordByName = exports.getRecordById = exports.latestRecords = exports.getRecordsWithInWishlistField = void 0;
var userUtils_1 = require("../user/userUtils");
var getRecordsWithInWishlistField = function (records, wishlistProducts) {
    var wishlistProductsIds = wishlistProducts.map(function (product) { return product.id; });
    var newRecords = [];
    for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
        var record = records_1[_i];
        if (wishlistProductsIds.includes(record.id)) {
            newRecords.push({
                id: record.id,
                name: record.name,
                description: record.description,
                albumCover: record.albumCover,
                releaseDate: record.releaseDate,
                price: record.price,
                artist: record.artist,
                isInWishlist: true
            });
        }
        else {
            newRecords.push({
                id: record.id,
                name: record.name,
                description: record.description,
                albumCover: record.albumCover,
                releaseDate: record.releaseDate,
                price: record.price,
                artist: record.artist,
                isInWishlist: false
            });
        }
    }
    return newRecords;
};
exports.getRecordsWithInWishlistField = getRecordsWithInWishlistField;
var latestRecords = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var newestRecords, currentUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, context.prisma.record.findMany({
                    include: {
                        artist: true
                    },
                    orderBy: {
                        releaseDate: "desc"
                    },
                    take: 5
                })];
            case 1:
                newestRecords = _a.sent();
                if (!(context.userId !== null)) return [3, 3];
                return [4, userUtils_1.user(context)];
            case 2:
                currentUser = _a.sent();
                return [2, exports.getRecordsWithInWishlistField(newestRecords, currentUser.wishlist.products)];
            case 3: return [2, newestRecords];
        }
    });
}); };
exports.latestRecords = latestRecords;
var getRecordById = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, context.prisma.record.findUnique({
                where: {
                    id: args.recordId
                },
                rejectOnNotFound: function () {
                    throw new Error("Record not found");
                }
            })];
    });
}); };
exports.getRecordById = getRecordById;
var getRecordByName = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, context.prisma.record.findUnique({
                where: {
                    name: args.recordName
                },
                rejectOnNotFound: function () {
                    throw new Error("Record not found");
                }
            })];
    });
}); };
exports.getRecordByName = getRecordByName;

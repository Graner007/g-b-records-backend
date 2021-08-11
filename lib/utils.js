"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.APP_SECRET = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.APP_SECRET = "YeXjit3lNqsE1mSqwS4DnproXHJD9of1dD0nKg5aqcozJfIFLwRHjfjPmEAbP1pp5IxvgO7C1U7G8Inh5XTa2eBBqftqTuOXzlZHm2LPzl5mdAyr8XbWFGvBS4K8Y96PYhUCBlRbDICatweWKO7kuDv0LebaSJq2QNoKmTEsqW1erbLtzTdcVCc9cPIpT98XgAJT6jfE";
var getTokenPayload = function (token) { return jsonwebtoken_1.default.verify(token, exports.APP_SECRET); };
var getUserId = function (req, authToken) {
    if (req) {
        var authHeader = req.headers.authorization;
        if (authHeader) {
            var token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            return getTokenPayload(token);
        }
    }
    else if (authToken) {
        return getTokenPayload(authToken);
    }
    throw new Error('Not authenticated');
};
exports.getUserId = getUserId;

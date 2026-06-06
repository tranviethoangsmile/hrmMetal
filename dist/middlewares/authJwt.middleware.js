"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("../helpers");
dotenv_1.default.config();
const SECRET = process.env.SECRET || '';
const getBearerToken = (authorization) => {
    if (!authorization) {
        return '';
    }
    const [scheme, token] = authorization.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return '';
    }
    return token;
};
const authJwt = (req, res, next) => {
    const token = getBearerToken(req.headers.authorization);
    if (!token) {
        return (0, helpers_1.errorResponse)(res, 401, 'Authentication token is required');
    }
    try {
        const secret = crypto_1.default.createHash('sha256').update(SECRET).digest('hex');
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded || typeof decoded === 'string') {
            return (0, helpers_1.errorResponse)(res, 401, 'Invalid authentication token');
        }
        req.user = decoded;
        return next();
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 401, (error === null || error === void 0 ? void 0 : error.message) || 'Invalid authentication token');
    }
};
exports.default = authJwt;

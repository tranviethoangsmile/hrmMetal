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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.very_token_order = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET || 'secret';
const very_token_order = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token_req = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
    const secret = crypto_1.default.createHash('sha256').update(SECRET).digest('hex');
    let active;
    jsonwebtoken_1.default.verify(token_req, secret, (err, decoded) => {
        if (err) {
            res.status(200).json({
                success: false,
                message: 'authentication failed',
            });
        }
        else {
            active = decoded;
            if (active.position != '') {
                next();
            }
            else {
                res.status(200).send({
                    success: false,
                    message: 'you are not authorized',
                });
            }
        }
    });
});
exports.very_token_order = very_token_order;

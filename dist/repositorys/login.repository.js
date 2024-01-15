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
exports.login = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET = process.env.SECRET || '';
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_name = user.user_name;
        const password = user.password;
        const user_login = yield models_1.User.findOne({
            where: {
                user_name: user_name,
            },
            attributes: [
                'id',
                'name',
                'user_name',
                'avatar',
                'role',
                'password',
                'position',
                'role',
                'is_admin',
            ],
            include: [
                {
                    model: models_1.Department,
                    as: 'department',
                    attributes: ['name'],
                },
            ],
        });
        if (user_login != null) {
            const pass = yield bcrypt_1.default.compare(password, user_login.password);
            const user_payload = {
                id: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.id,
                name: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.name,
                user_name: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.user_name,
                avatar: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.avatar,
                position: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.position,
                role: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.role,
                is_admin: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.is_admin,
                department: user_login === null || user_login === void 0 ? void 0 : user_login.dataValues.department,
            };
            if (pass) {
                const secret = crypto_1.default
                    .createHash('sha256')
                    .update(SECRET)
                    .digest('hex');
                const payload = Object.assign({}, user_payload);
                const token = jsonwebtoken_1.default.sign(payload, secret);
                return {
                    success: true,
                    data: payload,
                    token: token,
                };
            }
            else {
                return {
                    success: false,
                    message: 'Password wrong...!!!',
                };
            }
        }
        else {
            return {
                success: false,
                message: 'user not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.login = login;

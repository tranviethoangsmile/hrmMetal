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
Object.defineProperty(exports, "__esModule", { value: true });
const useCases_1 = require("../useCases");
const authAdminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // should use admin_id :(
        const { user_id } = req.body;
        if (!user_id || typeof user_id !== 'string' || user_id.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'User ID is required and must be a non-empty string',
            });
        }
        const user = yield (0, useCases_1.findUserById)(user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success) ||
            !(user === null || user === void 0 ? void 0 : user.data) ||
            ((_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.role.toString()) !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action because you are not an admin',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`,
        });
    }
});
exports.default = authAdminRole;

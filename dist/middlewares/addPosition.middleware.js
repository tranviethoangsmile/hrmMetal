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
const addPosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { user_id } = req.body;
        if (typeof user_id !== 'string' || !user_id.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid User ID',
            });
        }
        const user = yield (0, useCases_1.findUserById)(user_id);
        if (user === null || user === void 0 ? void 0 : user.success) {
            req.body.position = (_a = user.data) === null || _a === void 0 ? void 0 : _a.position;
            return next();
        }
        return res.status(200).json({
            success: false,
            message: (user === null || user === void 0 ? void 0 : user.message) || 'Failed to retrieve user data',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`,
        });
    }
});
exports.default = addPosition;

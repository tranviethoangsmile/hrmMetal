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
const user_controller_1 = require("../controllers/user.controller");
const very_role = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = req.body.user_id;
        const user = yield (0, user_controller_1.findById)(user_id);
        if (((_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.role.toString()) !== 'STAFF') {
            next();
        }
        else {
            res.status(401).json({
                success: false,
                message: 'you not Unauthorized',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
});
exports.default = very_role;

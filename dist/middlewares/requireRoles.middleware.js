"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const requireRoles = (allowRoles) => (req, res, next) => {
    var _a;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (!role || !allowRoles.includes(role)) {
        return (0, helpers_1.errorResponse)(res, 403, `You do not have permission for this action`);
    }
    next();
};
exports.default = requireRoles;

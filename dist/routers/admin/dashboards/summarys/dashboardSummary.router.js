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
const express_1 = require("express");
const controllers_1 = require("../../../../controllers");
const helpers_1 = require("../../../../helpers");
const adminSummaryRouter = (0, express_1.Router)();
adminSummaryRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const position = (_a = req.user) === null || _a === void 0 ? void 0 : _a.position;
        const date = req.body.date;
        if (position == undefined || date == undefined) {
            const missingFields = [
                !position && 'position',
                !date && 'date',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing required ${missingFields}`);
        }
        const adminSummarys = yield (0, controllers_1.adminDashboardSummaryController)(position, date);
        if (!(adminSummarys === null || adminSummarys === void 0 ? void 0 : adminSummarys.success)) {
            return (0, helpers_1.errorResponse)(res, 203, `${adminSummarys === null || adminSummarys === void 0 ? void 0 : adminSummarys.message}`);
        }
        return (0, helpers_1.successResponse)(res, 202, adminSummarys === null || adminSummarys === void 0 ? void 0 : adminSummarys.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, `serrver error: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
}));
exports.default = adminSummaryRouter;

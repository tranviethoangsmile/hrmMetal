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
exports.findCodeErrorsByDailyReportIdUseCase = void 0;
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const codeErrorsRepository = new repositorys_1.CodeErrorsRepository();
const findCodeErrorsByDailyReportIdUseCase = (dailyReportId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.validation_id)(dailyReportId);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const result = yield codeErrorsRepository.FIND_BY_DAILY_REPORT_ID(dailyReportId);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error((result === null || result === void 0 ? void 0 : result.message) || 'Failed to find code errors');
        }
        return {
            success: true,
            data: result === null || result === void 0 ? void 0 : result.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.findCodeErrorsByDailyReportIdUseCase = findCodeErrorsByDailyReportIdUseCase;

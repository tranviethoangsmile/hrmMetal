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
const models_1 = require("../../models");
class CodeErrorsRepository {
    CREATE(codeErrors, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCodeErrors = yield models_1.CodeError.bulkCreate(codeErrors, { transaction });
                return {
                    success: true,
                    data: newCodeErrors,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    FIND_BY_DAILY_REPORT_ID(dailyReportId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codeErrors = yield models_1.CodeError.findAll({
                    where: {
                        daily_report_id: dailyReportId
                    },
                    attributes: [
                        'code',
                        'description',
                        'shutdown_time',
                        'error_date',
                    ],
                });
                if (codeErrors === null || codeErrors.length < 1) {
                    throw new Error('code errors not found');
                }
                return {
                    success: true,
                    data: codeErrors
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        });
    }
}
exports.default = CodeErrorsRepository;

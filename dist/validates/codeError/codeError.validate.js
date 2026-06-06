"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid_search_err = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schema_search_error_report = joi_1.default.object({
    code: joi_1.default.string(),
    description: joi_1.default.string(),
    shutdown_time: joi_1.default.number(),
    daily_report_id: joi_1.default.string().guid().required(),
});
const valid_search_err = (data) => {
    return schema_search_error_report.validate(data);
};
exports.valid_search_err = valid_search_err;

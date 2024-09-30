"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid_search_daily_report = exports.valid_create_daily_report = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schame_create_daily_report = joi_1.default.object({
    product: joi_1.default.string().required(),
    user_id: joi_1.default.string().guid().required(),
    department_id: joi_1.default.string().guid().required(),
    date: joi_1.default.date().required(),
    shift: joi_1.default.string().length(1).required(),
    quantity: joi_1.default.number().min(0).max(999).required(),
    operated_time: joi_1.default.number().min(0).max(999).required(),
    shutdown_time: joi_1.default.number().min(0).max(999).required(),
    operator_history: joi_1.default.string().required(),
});
const schame_search_daily_report = joi_1.default.object({
    product: joi_1.default.string().allow(''),
    user_id: joi_1.default.string(),
    department_id: joi_1.default.string().guid().required(),
    date: joi_1.default.date(),
    shift: joi_1.default.string().allow(''),
});
const valid_create_daily_report = (data) => {
    return schame_create_daily_report.validate(data);
};
exports.valid_create_daily_report = valid_create_daily_report;
const valid_search_daily_report = (data) => {
    return schame_search_daily_report.validate(data);
};
exports.valid_search_daily_report = valid_search_daily_report;

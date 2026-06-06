"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_paid_leave_of_position_in_date_for_admin_validate = exports.get_checkin_detail_in_day_of_user_validate = exports.get_checkin_in_date_of_position_validate = exports.update_checkin_validate = exports.create_checkin_validate = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const scheme_create_checkin = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    time_in: joi_1.default.string().required(),
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    work_shift: joi_1.default.string().required(),
    is_weekend: joi_1.default.boolean(),
    position: joi_1.default.string().required(),
});
const scheme_update_checkin = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    time_out: joi_1.default.string().required(),
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    work_shift: joi_1.default.string().required(),
    is_checked: joi_1.default.boolean().required(),
    work_time: joi_1.default.number(),
    over_time: joi_1.default.number(),
});
const schema_get_checkin_in_date_of_position = joi_1.default.object({
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    position: joi_1.default.string().required(),
});
const schema_get_checkin_detail_in_date_of_user = joi_1.default.object({
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    user_id: joi_1.default.string().guid().required(),
});
const schema_get_all_paid_leave_of_position_in_date_for_admin = joi_1.default.object({
    date: joi_1.default.date().iso().required().messages({
        'date.format': 'Date must be in ISO 8601 format (yyyy-mm-dd)',
    }),
    position: joi_1.default.string().required(),
});
const get_all_paid_leave_of_position_in_date_for_admin_validate = (data) => {
    return schema_get_all_paid_leave_of_position_in_date_for_admin.validate(data);
};
exports.get_all_paid_leave_of_position_in_date_for_admin_validate = get_all_paid_leave_of_position_in_date_for_admin_validate;
const create_checkin_validate = (data) => {
    return scheme_create_checkin.validate(data);
};
exports.create_checkin_validate = create_checkin_validate;
const update_checkin_validate = (data) => {
    return scheme_update_checkin.validate(data);
};
exports.update_checkin_validate = update_checkin_validate;
const get_checkin_in_date_of_position_validate = (data) => {
    return schema_get_checkin_in_date_of_position.validate(data);
};
exports.get_checkin_in_date_of_position_validate = get_checkin_in_date_of_position_validate;
const get_checkin_detail_in_day_of_user_validate = (data) => {
    return schema_get_checkin_detail_in_date_of_user.validate(data);
};
exports.get_checkin_detail_in_day_of_user_validate = get_checkin_detail_in_day_of_user_validate;

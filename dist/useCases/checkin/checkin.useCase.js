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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_checkin_detail_in_date_of_user_use = exports.get_checkin_of_position_in_date_use = exports.search_checkin_of_user_in_month_useCase = exports.is_checked = exports.update_checkin_use = exports.create_checkin_use = void 0;
const validates_1 = require("../../validates");
const validates_2 = require("../../validates");
const repositorys_1 = require("../../repositorys");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const checkinRepository = new repositorys_1.CheckinRepository();
const get_checkin_detail_in_date_of_user_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_2.get_checkin_detail_in_day_of_user_validate)(field);
        if (isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const checkin_detail = yield checkinRepository.get_checkin_detail_in_date_of_user_repo(field);
        if (!(checkin_detail === null || checkin_detail === void 0 ? void 0 : checkin_detail.success)) {
            throw new Error(`${checkin_detail === null || checkin_detail === void 0 ? void 0 : checkin_detail.message}`);
        }
        return {
            success: true,
            data: checkin_detail === null || checkin_detail === void 0 ? void 0 : checkin_detail.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.get_checkin_detail_in_date_of_user_use = get_checkin_detail_in_date_of_user_use;
const is_checked = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const is_check = yield checkinRepository.isChecked(field);
        if (!(is_check === null || is_check === void 0 ? void 0 : is_check.success)) {
            throw new Error(`${is_check === null || is_check === void 0 ? void 0 : is_check.message}`);
        }
        return {
            success: true,
            data: is_check === null || is_check === void 0 ? void 0 : is_check.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.is_checked = is_checked;
const create_checkin_use = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_2.create_checkin_validate)(data);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const result_create = yield checkinRepository.create_checkin(data);
        if (!(result_create === null || result_create === void 0 ? void 0 : result_create.success)) {
            throw new Error(`${result_create === null || result_create === void 0 ? void 0 : result_create.message}`);
        }
        return {
            success: true,
            data: result_create === null || result_create === void 0 ? void 0 : result_create.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.create_checkin_use = create_checkin_use;
const update_checkin_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_2.update_checkin_validate)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const result_update = yield checkinRepository.update_checkin(Object.assign({}, field));
        if (!(result_update === null || result_update === void 0 ? void 0 : result_update.success)) {
            throw new Error(`${result_update === null || result_update === void 0 ? void 0 : result_update.message}`);
        }
        return {
            success: result_update === null || result_update === void 0 ? void 0 : result_update.success,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.update_checkin_use = update_checkin_use;
const search_checkin_of_user_in_month_useCase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isIdValid = (0, validates_1.validation_id)(field.user_id);
        if (isIdValid.error) {
            throw new Error(`${isIdValid === null || isIdValid === void 0 ? void 0 : isIdValid.error.message}`);
        }
        const checkins = yield checkinRepository.search_checkin_of_user_in_month({
            user_id: field.user_id,
            year: (0, moment_timezone_1.default)(field.date).format('yyyy'),
            month: (0, moment_timezone_1.default)(field.date).format('MM'),
        });
        if (!(checkins === null || checkins === void 0 ? void 0 : checkins.success)) {
            throw new Error(`${checkins === null || checkins === void 0 ? void 0 : checkins.message}`);
        }
        return {
            success: true,
            data: checkins === null || checkins === void 0 ? void 0 : checkins.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.search_checkin_of_user_in_month_useCase = search_checkin_of_user_in_month_useCase;
const get_checkin_of_position_in_date_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_2.get_checkin_in_date_of_position_validate)(field);
        if (isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const checkins = yield checkinRepository.get_checkin_of_position_in_date_repo(field);
        if (!(checkins === null || checkins === void 0 ? void 0 : checkins.success)) {
            throw new Error(`${checkins === null || checkins === void 0 ? void 0 : checkins.message}`);
        }
        return {
            success: true,
            data: checkins === null || checkins === void 0 ? void 0 : checkins.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.get_checkin_of_position_in_date_use = get_checkin_of_position_in_date_use;

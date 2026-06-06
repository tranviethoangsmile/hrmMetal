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
exports.get_all_paid_leave_of_position_in_date_for_admin_use = exports.get_all_checkins_of_position_in_date_for_admin_use = exports.get_checkin_detail_in_date_of_user_use = exports.get_checkin_of_position_in_date_use = exports.search_checkin_of_user_in_month_useCase = exports.is_checked = exports.update_checkin_use = exports.create_checkin_use = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const enum_1 = require("../../enum");
// import { setCache, getCache, delCache } from '../../utils';
const helpers_1 = require("../../helpers");
const checkinRepository = new repositorys_1.CheckinRepository();
const get_checkin_detail_in_date_of_user_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.get_checkin_detail_in_day_of_user_validate)(field);
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
        // const YEAR = moment(data.date).format('yyyy');
        // const MONTH = moment(data.date).format('MM');
        // const KEY_CACHE = `checkin_user_${data.user_id}_month_${MONTH}_year_${YEAR}`;
        // await delCache(KEY_CACHE);
        const valid = (0, validates_1.create_checkin_validate)(data);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        if (!(0, helpers_1.isValidEnumValue)(data === null || data === void 0 ? void 0 : data.work_shift, enum_1.shift_work)) {
            throw new Error(`Shift work is not valid`);
        }
        if (!(0, helpers_1.isValidEnumValue)(data === null || data === void 0 ? void 0 : data.position, enum_1.Position)) {
            throw new Error(`User position is not valid`);
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
        const isValid = (0, validates_1.update_checkin_validate)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const YEAR = (0, moment_timezone_1.default)(field.date).format('yyyy');
        const MONTH = (0, moment_timezone_1.default)(field.date).format('MM');
        // const KEY_CACHE = `checkin_user_${field.user_id}_month_${MONTH}_year_${YEAR}`;
        // await delCache(KEY_CACHE);
        if (!Object.keys(enum_1.shift_work).includes(field.work_shift)) {
            throw new Error(`shift work not avaliable`);
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
    const YEAR = (0, moment_timezone_1.default)(field.date).format('yyyy');
    const MONTH = (0, moment_timezone_1.default)(field.date).format('MM');
    try {
        const isIdValid = (0, validates_1.validation_id)(field.user_id);
        if (isIdValid.error) {
            throw new Error(`${isIdValid === null || isIdValid === void 0 ? void 0 : isIdValid.error.message}`);
        }
        // const KEY_CACHE = `checkin_user_${field.user_id}_month_${MONTH}_year_${YEAR}`;
        // const checkin_value_of_user = await getCache(KEY_CACHE);
        // if (checkin_value_of_user) {
        //     return {
        //         success: true,
        //         data: JSON.parse(checkin_value_of_user),
        //     };
        // }
        const checkins = yield checkinRepository.search_checkin_of_user_in_month({
            user_id: field.user_id,
            year: YEAR,
            month: MONTH,
        });
        if (!(checkins === null || checkins === void 0 ? void 0 : checkins.success)) {
            throw new Error(`${checkins === null || checkins === void 0 ? void 0 : checkins.message}`);
        }
        // await setCache(KEY_CACHE, JSON.stringify(checkins?.data), 86400); // Cache expires in 24 hours
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
        const isValid = (0, validates_1.get_checkin_in_date_of_position_validate)(field);
        // const KEY_CACHE = `checkin_position_${field.position}_date_${field.date}`;
        // const checkin_value_of_position = await getCache(KEY_CACHE);
        // if (checkin_value_of_position) {
        //     return {
        //         success: true,
        //         data: JSON.parse(checkin_value_of_position),
        //     };
        // }
        if (isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (!Object.keys(enum_1.Position).includes(field.position)) {
            throw new Error(`Position is not valid: ${field.position}`);
        }
        const checkins = yield checkinRepository.get_checkin_of_position_in_date_repo(field);
        if (!(checkins === null || checkins === void 0 ? void 0 : checkins.success)) {
            throw new Error(`${checkins === null || checkins === void 0 ? void 0 : checkins.message}`);
        }
        // await setCache(KEY_CACHE, JSON.stringify(checkins?.data), 600);
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
const get_all_checkins_of_position_in_date_for_admin_use = (position, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, helpers_1.isValidEnumValue)(position, enum_1.Position)) {
            throw new Error(`Position is not valid: ${position}`);
        }
        const formattedDate = (0, moment_timezone_1.default)(date).format('YYYY-MM-DD');
        if (formattedDate !== date) {
            throw new Error(`Date is not valid: ${date}`);
        }
        const checkins = yield checkinRepository.GET_ALL_CHECKINS_OF_POSITION_IN_DATE_FOR_ADMIN(date, position);
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
exports.get_all_checkins_of_position_in_date_for_admin_use = get_all_checkins_of_position_in_date_for_admin_use;
const get_all_paid_leave_of_position_in_date_for_admin_use = (position, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.get_all_paid_leave_of_position_in_date_for_admin_validate)({ position, date });
        if (isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (!(0, helpers_1.isValidEnumValue)(position, enum_1.Position)) {
            throw new Error(`Position is not valid: ${position}`);
        }
        const paid_leaves = yield checkinRepository.GET_ALL_PAID_LEAVE_OF_POSITION_IN_DATE_FOR_ADMIN(date, position);
        if (!(paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.success)) {
            throw new Error(`${paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.message}`);
        }
        return {
            success: true,
            data: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.get_all_paid_leave_of_position_in_date_for_admin_use = get_all_paid_leave_of_position_in_date_for_admin_use;

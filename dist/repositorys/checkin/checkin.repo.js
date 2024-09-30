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
const models_1 = require("../../models");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const sequelize_1 = require("sequelize");
class CheckinRepository {
    create_checkin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const create_value_checkin = yield models_1.Checkin.create(Object.assign({}, data));
                if (create_value_checkin == null) {
                    throw new Error('create checkin not success');
                }
                return {
                    success: true,
                    data: create_value_checkin,
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
    update_checkin(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update_value_checkin = yield models_1.Checkin.update({
                    time_out: field.time_out,
                    over_time: field.over_time,
                    work_time: field.work_time,
                    is_checked: field.is_checked,
                }, {
                    where: {
                        user_id: field.user_id,
                        date: field.date,
                        work_shift: field.work_shift,
                    },
                });
                if (update_value_checkin[0] < 1) {
                    throw new Error(`update failded`);
                }
                return {
                    success: true,
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
    isChecked(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const is_checked = yield models_1.Checkin.findOne({
                    where: Object.assign({}, field),
                });
                if (is_checked === null) {
                    throw new Error(`not checked`);
                }
                return {
                    success: true,
                    data: is_checked,
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
    search_checkin_of_user_in_month(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = (0, moment_timezone_1.default)(`${field.year}-${field.month}-01`, 'YYYY-MM-DD').format('YYYY-MM-DD');
                const endDate = (0, moment_timezone_1.default)(startDate, 'YYYY-MM-DD')
                    .endOf('month')
                    .format('YYYY-MM-DD');
                const checkins = yield models_1.Checkin.findAll({
                    where: {
                        user_id: field.user_id,
                        date: {
                            [sequelize_1.Op.gte]: startDate,
                            [sequelize_1.Op.lte]: endDate,
                        },
                    },
                    attributes: [
                        'id',
                        'date',
                        'user_id',
                        'time_in',
                        'work_shift',
                        'time_out',
                        'work_time',
                        'over_time',
                        'is_weekend',
                        'is_paid_leave',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['id', 'name', 'employee_id'],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (checkins === null || checkins.length < 1) {
                    throw new Error(`user not have data checkin this month`);
                }
                return {
                    success: true,
                    data: checkins,
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
    get_checkin_detail_in_date_of_user_repo(filed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkin_detail = yield models_1.Checkin.findOne({
                    where: Object.assign({}, filed),
                    attributes: [
                        'id',
                        'date',
                        'user_id',
                        'time_in',
                        'work_shift',
                        'time_out',
                        'work_time',
                        'over_time',
                        'is_weekend',
                        'is_paid_leave',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: [
                                'name',
                                'role',
                                'employee_id',
                                'position',
                                'avatar',
                            ],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (checkin_detail === null) {
                    throw new Error(`data not found`);
                }
                return {
                    success: true,
                    data: checkin_detail,
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
    get_checkin_of_position_in_date_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkins = yield models_1.Checkin.findAll({
                    where: {
                        date: field.date,
                    },
                    attributes: [
                        'user_id',
                        'date',
                        'work_shift',
                        'work_time',
                        'over_time',
                        'time_in',
                        'time_out',
                        'is_weekend',
                        'is_paid_leave',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: [
                                'name',
                                'role',
                                'employee_id',
                                'position',
                                'avatar',
                            ],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                            where: {
                                position: field.position,
                            },
                        },
                    ],
                });
                if (checkins === null || checkins.length < 1) {
                    throw new Error(`user not have data checkin this month`);
                }
                return {
                    success: true,
                    data: checkins,
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
}
exports.default = CheckinRepository;

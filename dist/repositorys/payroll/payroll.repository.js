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
class PayrollRepository {
    create_payroll_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield models_1.Payroll.create(Object.assign({}, field));
                if (event == null) {
                    throw new Error('Error creating payroll');
                }
                return {
                    success: true,
                    data: event,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    destroy_payroll_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Payroll.destroy({
                    where: {
                        id: id,
                    },
                });
                if (result !== 1) {
                    throw new Error('Error deleting payroll');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    update_payroll_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payroll = yield models_1.Payroll.update(Object.assign({}, field), {
                    where: {
                        id: field.id,
                    },
                });
                if (payroll[0] !== 1) {
                    throw new Error('Error updating payroll');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    search_payroll_by_id_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payroll = yield models_1.Payroll.findOne({
                    where: {
                        id: id,
                    },
                });
                if (payroll == null) {
                    throw new Error('payroll not found or not avaliable');
                }
                return {
                    success: true,
                    data: payroll,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    search_payroll_of_user_in_month_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payroll = yield models_1.Payroll.findOne({
                    where: Object.assign(Object.assign({}, field), { is_active: true }),
                    attributes: [
                        'user_id',
                        'date',
                        'pay_date',
                        'work_time',
                        'over_time',
                        'paid_vacation_days',
                        'weekend_time',
                        'shift_night',
                        'paid_vacation_pay',
                        'work_salary',
                        'shift_night_salary',
                        'over_time_salary',
                        'refund_money',
                        'other_pay',
                        'weekend_salary',
                        'attendance_allowance_pay',
                        'travel_allowance_pay',
                        'bonus_pay',
                        'gross_salary',
                        'income_tax',
                        'social_insurance',
                        'health_insurance',
                        'uniform_deduction',
                        'accident_insurance',
                        'club_fee',
                        'rent_home',
                        'cost_of_living',
                        'other_deduction',
                        'net_salary',
                    ],
                });
                if (payroll == null) {
                    throw new Error('payroll not found or not avaliable');
                }
                return {
                    success: true,
                    data: payroll,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
}
exports.default = PayrollRepository;

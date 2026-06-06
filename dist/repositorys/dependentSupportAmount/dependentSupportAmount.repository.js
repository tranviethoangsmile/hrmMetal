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
class DependentSupportAmountRepo {
    CREATE(createDependentSupportAmountValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dependentSupportAmount = yield models_1.DependentSupportAmount.create(Object.assign({}, createDependentSupportAmountValue));
                if (dependentSupportAmount === null) {
                    throw new Error(`CREATE NEW DEPENDENT SUPPORT AMOUNT FAILED`);
                }
                return {
                    success: true,
                    data: dependentSupportAmount
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    UPDATE(updateDependentSupportAmountValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.DependentSupportAmount.update(Object.assign({}, updateDependentSupportAmountValue), {
                    where: {
                        id: updateDependentSupportAmountValue === null || updateDependentSupportAmountValue === void 0 ? void 0 : updateDependentSupportAmountValue.id,
                        is_confirm: false
                    }
                });
                if ((result === null || result === void 0 ? void 0 : result.toString()) !== '1') {
                    throw new Error("UPDATE DEPENDENT SUPPORT AMOUNT FAILED");
                }
                return {
                    success: true
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    UPDATE_CONFIRM_BY_ADMIN(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.DependentSupportAmount.update({
                    is_confirm: true
                }, {
                    where: {
                        id: id
                    }
                });
                if ((result === null || result === void 0 ? void 0 : result.toString()) !== '1') {
                    throw new Error("UPDATE DEPENDENT SUPPORT AMOUNT FAILED");
                }
                return {
                    success: true
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    DELETE(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.DependentSupportAmount.destroy({
                    where: {
                        id: id,
                        user_id: user_id
                    }
                });
                if (result !== 1) {
                    throw new Error(`delete dependent support amount failed`);
                }
                return {
                    success: true
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dependentSupportAmount = yield models_1.DependentSupportAmount.findByPk(id, {
                    attributes: [
                        'id',
                        'user_id',
                        'year',
                        'supported_amount',
                        'is_supporting_current_year',
                        'expected_support_years',
                        'is_confirm',
                        'notes',
                        'media_path',
                        'created_at'
                    ],
                    include: [
                        {
                            model: models_1.User,
                            as: 'userDetail',
                            attributes: [
                                'id',
                                'name',
                                'user_name',
                                'employee_id',
                                'is_active',
                                'position',
                                'is_admin',
                                'is_officer',
                                'avatar',
                            ]
                        },
                        {
                            model: models_1.TaxDependent,
                            as: 'taxDependentDetail'
                        }
                    ]
                });
                if (dependentSupportAmount === null) {
                    throw new Error(`dependent support amount not found`);
                }
                return {
                    success: true,
                    data: dependentSupportAmount,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    GET_DEPENDENT_SUPPORT_AMOUNT_BY_TAX_DEPENDENT_ID_AND_YEAR(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dependentSupportAmount = yield models_1.DependentSupportAmount.findAll({
                    where: Object.assign({}, fields)
                });
                if (dependentSupportAmount === null || (dependentSupportAmount === null || dependentSupportAmount === void 0 ? void 0 : dependentSupportAmount.length) === 0) {
                    throw new Error(`dependent support amount not found`);
                }
                return {
                    success: true,
                    data: dependentSupportAmount,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = DependentSupportAmountRepo;

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
class TaxDependentRepository {
    CREATE(taxDependentValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxDependent = yield models_1.TaxDependent.create(Object.assign({}, taxDependentValue));
                if (taxDependent === null) {
                    throw new Error(`Create new Tax Denpendent failed`);
                }
                return {
                    success: true,
                    data: taxDependent,
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
    DELETE(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield models_1.TaxDependent.destroy({
                    where: {
                        id: id,
                    },
                });
                if (deleteResult < 1) {
                    throw new Error(`delete tax dependent with ID: ${id} failed`);
                }
                return {
                    success: true,
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
    UPDATE(taxDependentValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxDependent = yield models_1.TaxDependent.update(Object.assign({}, taxDependentValue), {
                    where: {
                        id: taxDependentValue.id,
                    },
                });
                if (taxDependent[0] === 0) {
                    throw new Error(`Failed to update tax dependent`);
                }
                return {
                    success: true,
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
    UPDATE_STATUS(updateStatusValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxDependent = yield models_1.TaxDependent.update({ status: updateStatusValue === null || updateStatusValue === void 0 ? void 0 : updateStatusValue.status, notes: updateStatusValue === null || updateStatusValue === void 0 ? void 0 : updateStatusValue.notes }, {
                    where: {
                        id: updateStatusValue === null || updateStatusValue === void 0 ? void 0 : updateStatusValue.id,
                    },
                });
                if (taxDependent[0] === 0) {
                    throw new Error(`Failed to update status`);
                }
                return {
                    success: true,
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
    GET_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxDependent = yield models_1.TaxDependent.findByPk(id);
                if (taxDependent === null) {
                    throw new Error(`tax dependent not found`);
                }
                return {
                    success: true,
                    data: taxDependent,
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
    GET_ALL_BY_USER_ID(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxDependents = yield models_1.TaxDependent.findAll({
                    where: {
                        user_id: user_id,
                    },
                });
                if (taxDependents.length < 1) {
                    throw new Error(`tax dependent not found`);
                }
                return {
                    success: true,
                    data: taxDependents,
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
    GET_TAX_DEPENDENT_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taxDependent = yield models_1.TaxDependent.findByPk(id);
                if (taxDependent === null) {
                    throw new Error(`tax dependent not found`);
                }
                return {
                    success: true,
                    data: taxDependent
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
exports.default = TaxDependentRepository;

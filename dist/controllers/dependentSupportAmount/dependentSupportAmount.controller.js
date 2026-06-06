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
exports.get_dependent_support_amount_by_tax_dependent_id_and_year_controller = exports.get_dependent_support_amount_controller = exports.delete_dependent_support_amount_controller = exports.update_confirm_dependent_support_amount_controller = exports.update_dependent_support_amount_controller = exports.create_dependent_support_amount_controller = void 0;
const useCases_1 = require("../../useCases");
const create_dependent_support_amount_controller = (createDependenSupportAmount) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.create_dependent_support_amount_usecase)(createDependenSupportAmount);
});
exports.create_dependent_support_amount_controller = create_dependent_support_amount_controller;
const update_dependent_support_amount_controller = (updateDependenSupportAmount) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.update_dependent_support_amount_usecase)(updateDependenSupportAmount);
});
exports.update_dependent_support_amount_controller = update_dependent_support_amount_controller;
const update_confirm_dependent_support_amount_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.update_confirm_dependent_support_amount_usecase)(id);
});
exports.update_confirm_dependent_support_amount_controller = update_confirm_dependent_support_amount_controller;
const delete_dependent_support_amount_controller = (deleteValue) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.delete_dependent_support_amount_usecase)(deleteValue);
});
exports.delete_dependent_support_amount_controller = delete_dependent_support_amount_controller;
const get_dependent_support_amount_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.get_dependent_support_amount_usecase)(id);
});
exports.get_dependent_support_amount_controller = get_dependent_support_amount_controller;
const get_dependent_support_amount_by_tax_dependent_id_and_year_controller = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.get_dependent_support_amount_by_tax_dependent_id_and_year_usecase)(fields);
});
exports.get_dependent_support_amount_by_tax_dependent_id_and_year_controller = get_dependent_support_amount_by_tax_dependent_id_and_year_controller;

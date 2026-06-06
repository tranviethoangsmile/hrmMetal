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
exports.updateTaxDependentStatusWithIdController = exports.getTaxDependentByUserIdController = exports.updateTaxDependentWithIdController = exports.deleteTaxDependentWithIdController = exports.createTaxDependentController = void 0;
const useCases_1 = require("../../useCases");
const createTaxDependentController = (createValue) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.createTaxDependentUseCase)(createValue);
});
exports.createTaxDependentController = createTaxDependentController;
const deleteTaxDependentWithIdController = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.deleteTaxDependentWithIdUseCase)(id);
});
exports.deleteTaxDependentWithIdController = deleteTaxDependentWithIdController;
const updateTaxDependentWithIdController = (updateValue) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.updateTaxDependentWithIdUseCase)(updateValue);
});
exports.updateTaxDependentWithIdController = updateTaxDependentWithIdController;
const getTaxDependentByUserIdController = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.getTaxDependentByUserIdUseCase)(user_id);
});
exports.getTaxDependentByUserIdController = getTaxDependentByUserIdController;
const updateTaxDependentStatusWithIdController = (updateStatusValue) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.updateTaxDependentStatusWithIdUseCase)(updateStatusValue);
});
exports.updateTaxDependentStatusWithIdController = updateTaxDependentStatusWithIdController;

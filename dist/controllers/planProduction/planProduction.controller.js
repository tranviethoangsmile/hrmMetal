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
exports.search_plan_production_seven_day_of_department_controller = exports.destroy_plan_production_cotroller = exports.search_plan_production_by_id_controller = exports.update_plan_production_controller = exports.create_plan_production_controller = void 0;
const useCases_1 = require("../../useCases");
const create_plan_production_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_plan_production_use)(field);
});
exports.create_plan_production_controller = create_plan_production_controller;
const update_plan_production_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_plan_production_use)(field);
});
exports.update_plan_production_controller = update_plan_production_controller;
const search_plan_production_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_plan_production_by_id_use)(id);
});
exports.search_plan_production_by_id_controller = search_plan_production_by_id_controller;
const destroy_plan_production_cotroller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.destroy_plan_production_use)(id);
});
exports.destroy_plan_production_cotroller = destroy_plan_production_cotroller;
const search_plan_production_seven_day_of_department_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_plan_production_seven_day_of_department_use)(field);
});
exports.search_plan_production_seven_day_of_department_controller = search_plan_production_seven_day_of_department_controller;

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
exports.find_all = exports.find = exports.create = void 0;
const food_useCase_1 = require("../useCases/food.useCase");
const create = (food) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, food_useCase_1.createFood)(food);
});
exports.create = create;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, food_useCase_1.findFoodById)(id);
});
exports.find = find;
const find_all = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, food_useCase_1.find_all_food)();
});
exports.find_all = find_all;

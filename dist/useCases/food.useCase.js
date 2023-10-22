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
exports.find_all_food = exports.findFoodById = exports.createFood = void 0;
const food_repository_1 = require("../repositorys/food.repository");
const food_validate_1 = require("../validates/food.validate");
const validates_1 = require("../validates");
const createFood = (food) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodCreateField = yield (0, food_validate_1.validate_food_create)(food);
        if (!foodCreateField.error) {
            const new_food = yield (0, food_repository_1.create_food)(Object.assign({}, food));
            if (new_food === null || new_food === void 0 ? void 0 : new_food.success) {
                return {
                    success: true,
                    data: new_food === null || new_food === void 0 ? void 0 : new_food.data,
                };
            }
            else {
                return {
                    success: false,
                    message: new_food === null || new_food === void 0 ? void 0 : new_food.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'data not valid',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.createFood = createFood;
const findFoodById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, validates_1.validation_id)(id);
        if (!valid.error) {
            const food = yield (0, food_repository_1.find_food_by_id)(id);
            if (food === null || food === void 0 ? void 0 : food.success) {
                return {
                    success: true,
                    data: food === null || food === void 0 ? void 0 : food.data,
                };
            }
            else {
                return {
                    success: false,
                    message: food === null || food === void 0 ? void 0 : food.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'id not valid',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.findFoodById = findFoodById;
const find_all_food = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield (0, food_repository_1.get_all_food)();
        if (foods === null || foods === void 0 ? void 0 : foods.success) {
            return {
                success: true,
                data: foods === null || foods === void 0 ? void 0 : foods.data,
            };
        }
        else {
            return {
                success: false,
                message: foods === null || foods === void 0 ? void 0 : foods.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_all_food = find_all_food;

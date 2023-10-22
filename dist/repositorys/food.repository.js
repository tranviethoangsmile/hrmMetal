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
exports.get_all_food = exports.find_food_by_id = exports.create_food = void 0;
const models_1 = require("../models");
const create_food = (food) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_food = yield models_1.Food.create(Object.assign({}, food));
        if (new_food != null) {
            return {
                success: true,
                data: new_food,
            };
        }
        else {
            return {
                success: false,
                message: 'create food failed',
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
exports.create_food = create_food;
const find_food_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield models_1.Food.findOne({
            where: {
                id: id,
            },
        });
        if (food != null) {
            return {
                success: true,
                data: food,
            };
        }
        else {
            return {
                success: false,
                message: 'food not found',
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
exports.find_food_by_id = find_food_by_id;
const get_all_food = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield models_1.Food.findAll();
        if (foods != null) {
            return {
                success: true,
                data: foods,
            };
        }
        else {
            return {
                success: false,
                message: 'food not found',
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
exports.get_all_food = get_all_food;

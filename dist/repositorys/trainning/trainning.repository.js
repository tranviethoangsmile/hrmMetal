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
exports.search_trainning = exports.find_all_trainning = exports.Create_trainning = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const Create_trainning = (trainning) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_trainning = yield models_1.Trainning.create(Object.assign({}, trainning));
        if (new_trainning != null) {
            return {
                success: true,
                data: new_trainning,
            };
        }
        else {
            return {
                success: false,
                message: 'create user error',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.Create_trainning = Create_trainning;
const find_all_trainning = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainnings = yield models_1.Trainning.findAll({
            attributes: [
                'id',
                'trainning_name',
                'product_name',
                'description',
                'media_path',
                'user_id',
            ],
            include: [
                {
                    model: models_1.User,
                    attributes: ['name'],
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
        if (trainnings != null) {
            return {
                success: true,
                data: trainnings,
            };
        }
        else {
            return {
                success: false,
                message: 'trainning not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.find_all_trainning = find_all_trainning;
const search_trainning = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainnings = yield models_1.Trainning.findAll({
            where: {
                product_name: {
                    [sequelize_1.Op.like]: `%${data.toUpperCase()}%`,
                },
            },
            attributes: [
                'id',
                'trainning_name',
                'product_name',
                'description',
                'media_path',
                'user_id',
            ],
            include: [
                {
                    model: models_1.User,
                    attributes: ['name'],
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
        if (trainnings != null) {
            return {
                success: true,
                data: trainnings,
            };
        }
        else {
            return {
                success: false,
                message: 'trainning not found',
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
exports.search_trainning = search_trainning;

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
exports.Search_all_trainning = exports.Get_all_trainning = exports.Create = void 0;
const trainning_repository_1 = require("../repositorys/trainning.repository");
const user_useCase_1 = require("./user.useCase");
const product_enum_1 = require("../enum/product.enum");
const trainning_validate_1 = require("../validates/trainning.validate");
const Create = (trainning) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, trainning_validate_1.validate_schema_trainning)(trainning);
        console.log(trainning);
        if (!(valid === null || valid === void 0 ? void 0 : valid.error)) {
            const user = yield (0, user_useCase_1.findUserById)(trainning.user_id);
            if (user.success) {
                if (typeof trainning.product_name === 'string' &&
                    Object.values(product_enum_1.Products).includes(trainning.product_name)) {
                    const new_trainning = yield (0, trainning_repository_1.Create_trainning)(trainning);
                    if (new_trainning === null || new_trainning === void 0 ? void 0 : new_trainning.success) {
                        return {
                            success: true,
                            data: new_trainning === null || new_trainning === void 0 ? void 0 : new_trainning.data,
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: new_trainning === null || new_trainning === void 0 ? void 0 : new_trainning.message,
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: 'product name not found',
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'user not exist',
                };
            }
        }
        else {
            return {
                success: false,
                message: valid.error.message,
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
exports.Create = Create;
const Get_all_trainning = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainnings = yield (0, trainning_repository_1.find_all_trainning)();
        if (trainnings === null || trainnings === void 0 ? void 0 : trainnings.success) {
            return {
                success: true,
                data: trainnings === null || trainnings === void 0 ? void 0 : trainnings.data,
            };
        }
        else {
            return {
                success: false,
                message: trainnings === null || trainnings === void 0 ? void 0 : trainnings.message,
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
exports.Get_all_trainning = Get_all_trainning;
const Search_all_trainning = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, trainning_validate_1.validate_schema_search_trainning)(data);
        if (!(valid === null || valid === void 0 ? void 0 : valid.error)) {
            const trainnings = yield (0, trainning_repository_1.search_trainning)(data);
            if (trainnings === null || trainnings === void 0 ? void 0 : trainnings.success) {
                return {
                    success: true,
                    data: trainnings === null || trainnings === void 0 ? void 0 : trainnings.data,
                };
            }
            else {
                return {
                    success: false,
                    message: trainnings === null || trainnings === void 0 ? void 0 : trainnings.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: valid === null || valid === void 0 ? void 0 : valid.error.message,
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
exports.Search_all_trainning = Search_all_trainning;

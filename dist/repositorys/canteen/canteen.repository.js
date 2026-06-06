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
exports.get_all_canteen = exports.find_canteen_by_id = exports.create_canteen = void 0;
const models_1 = require("../../models");
const create_canteen = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_canteen = yield models_1.Canteen.create(Object.assign({}, data));
        if (new_canteen != null) {
            return {
                success: true,
                data: new_canteen,
            };
        }
        else {
            return {
                success: false,
                message: 'create canteen failed',
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
exports.create_canteen = create_canteen;
const find_canteen_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const canteen = yield models_1.Canteen.findOne({
            where: {
                id: id,
            },
            attributes: ['factory_name', 'description'],
        });
        if (canteen != null) {
            return {
                success: true,
                data: canteen,
            };
        }
        else {
            return {
                success: false,
                message: 'canteen not found',
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
exports.find_canteen_by_id = find_canteen_by_id;
const get_all_canteen = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const canteens = yield models_1.Canteen.findAll();
        if (canteens != null) {
            return {
                success: true,
                data: canteens,
            };
        }
        else {
            return {
                success: false,
                message: 'canteen not found',
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
exports.get_all_canteen = get_all_canteen;
